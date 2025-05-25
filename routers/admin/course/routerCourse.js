import { Router } from "express";
import { client } from "../../../config/config.js";
import { authorize } from "../../../middlewares/authorize.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Storage for course images and videos
const storageCourse = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/course");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().getTime();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const uploadCourse = multer({ storage: storageCourse });
const router = Router();

// Course Endpoints
router.post(
  "/add-course",
  authorize("admin"),
  uploadCourse.single("thumbnail"),
  async (req, res) => {
    try {
      await client.query("BEGIN");

      const courseId = req.body.id; // If this exists, we're updating
      const {
        title,
        instructor,
        category,
        level,
        duration,
        price,
        description,
        objectives,
        requirements,
        is_published,
        video_preview,
      } = req.body;

      // Validate required fields
      if (!title || !instructor || !category || !level || !duration || !price) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          error: "Missing required fields",
          receivedData: req.body,
        });
      }

      let thumbnailPath = null;

      // Handle thumbnail for both create and update
      if (req.file) {
        thumbnailPath = `/assets/course/${req.file.filename}`;

        // If updating, delete old thumbnail
        if (courseId) {
          const oldCourse = await client.query(
            "SELECT thumbnail FROM courses WHERE id = $1",
            [courseId]
          );

          if (oldCourse.rows[0]?.thumbnail) {
            const oldPath = path.join(".", oldCourse.rows[0].thumbnail);
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
            }
          }
        }
      } else if (!courseId) {
        // Thumbnail required only for new courses
        await client.query("ROLLBACK");
        return res.status(400).json({
          error: "Thumbnail is required for new courses",
          receivedFile: req.file,
        });
      }

      let result;

      if (courseId) {
        // UPDATE existing course
        const updateFields = [];
        const updateValues = [];
        let paramCount = 1;

        const fieldsToUpdate = {
          title,
          instructor,
          category,
          level,
          duration,
          price,
          description: description || "",
          video_preview: video_preview || "",
          objectives: objectives ? JSON.parse(objectives) : [],
          requirements: requirements ? JSON.parse(requirements) : [],
          is_published: is_published === "true",
        };

        if (thumbnailPath) {
          fieldsToUpdate.thumbnail = thumbnailPath;
        }

        for (const [key, value] of Object.entries(fieldsToUpdate)) {
          updateFields.push(`${key} = $${paramCount}`);
          updateValues.push(value);
          paramCount++;
        }

        updateValues.push(courseId);

        result = await client.query(
          `UPDATE courses 
           SET ${updateFields.join(", ")}, updated_at = CURRENT_TIMESTAMP
           WHERE id = $${paramCount}
           RETURNING *`,
          updateValues
        );

        if (result.rows.length === 0) {
          await client.query("ROLLBACK");
          return res.status(404).json({ error: "Course not found" });
        }
      } else {
        // INSERT new course
        result = await client.query(
          `INSERT INTO courses (
            title, instructor, category, level, duration, price,
            description, thumbnail, video_preview, objectives,
            requirements, is_published
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *`,
          [
            title,
            instructor,
            category,
            level,
            duration,
            price,
            description || "",
            thumbnailPath,
            video_preview || "",
            objectives ? JSON.parse(objectives) : [],
            requirements ? JSON.parse(requirements) : [],
            is_published === "true",
          ]
        );
      }

      await client.query("COMMIT");
      res.json({
        message: courseId
          ? "Course updated successfully"
          : "Course created successfully",
        course: result.rows[0],
      });
    } catch (error) {
      console.log(error);
      await client.query("ROLLBACK");
      // Delete uploaded files if there was an error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      res.status(500).json({
        error: error.message,
        detail: `Failed to ${req.body.id ? "update" : "create"} course`,
      });
    }
  }
);

// Get all courses
router.get("/get-courses", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM courses ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      detail: "Failed to fetch courses",
    });
  }
});

// Get course by ID with all related data
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const courseResult = await client.query(
      "SELECT * FROM courses WHERE id = $1",
      [id]
    );

    if (!courseResult.rows[0]) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    const sectionsResult = await client.query(
      "SELECT * FROM sections WHERE course_id = $1 ORDER BY position",
      [id]
    );

    const course = courseResult.rows[0];
    const sections = await Promise.all(
      sectionsResult.rows.map(async (section) => {
        const lecturesResult = await client.query(
          "SELECT * FROM lectures WHERE section_id = $1 ORDER BY position",
          [section.id]
        );

        const lectures = await Promise.all(
          lecturesResult.rows.map(async (lecture) => {
            const resourcesResult = await client.query(
              "SELECT * FROM resources WHERE lecture_id = $1 ORDER BY position",
              [lecture.id]
            );
            return { ...lecture, resources: resourcesResult.rows };
          })
        );

        return { ...section, lectures };
      })
    );

    res.json({ ...course, sections });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      detail: "Failed to fetch course details",
    });
  }
});

// Delete course
router.delete("/delete-course/:id", authorize("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    // Get course data first to get file paths
    const courseResult = await client.query(
      "SELECT thumbnail, video_preview FROM courses WHERE id = $1",
      [id]
    );

    const course = courseResult.rows[0];
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await client.query("BEGIN");

    // Delete the course (cascade will handle related records)
    await client.query("DELETE FROM courses WHERE id = $1", [id]);

    await client.query("COMMIT");

    // Delete associated files
    if (course.thumbnail) {
      const thumbnailPath = path.join(
        "./assets/course",
        path.basename(course.thumbnail)
      );
      fs.unlink(thumbnailPath, (err) => {
        if (err) console.error("Error deleting thumbnail:", err);
      });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      error: error.message,
      detail: "Failed to delete course",
    });
  }
});

// Section Endpoints
router.post("/sections/add-section", authorize("admin"), async (req, res) => {
  const { course_id, title, description, position } = req.body;

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO sections (course_id, title, description, position)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [course_id, title, description, position]
    );

    await client.query("COMMIT");
    res.json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      error: error.message,
      detail: "Failed to create section",
    });
  }
});

// Lecture Endpoints
router.post("/lectures/add-lecture", authorize("admin"), async (req, res) => {
  const { section_id, title, description, duration, position, is_preview } =
    req.body;

  try {
    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO lectures (
        section_id, title, description, duration,
        position, is_preview
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [section_id, title, description, duration, position, is_preview]
    );

    await client.query("COMMIT");
    res.json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      error: error.message,
      detail: "Failed to create lecture",
    });
  }
});

// Resource Endpoints
router.post(
  "/resources/add-resource",
  uploadCourse.single("content"),
  async (req, res) => {
    try {
      await client.query("BEGIN");

      const {
        lecture_id,
        title,
        file_type,
        duration,
        is_downloadable,
        position,
      } = req.body;

      let contentUrl = null;
      let fileSize = null;

      if (req.file) {
        contentUrl = `/assets/course/${req.file.filename}`;
        fileSize = req.file.size;
      }

      const result = await client.query(
        `INSERT INTO resources (
          lecture_id, title, file_type, content_url,
          file_size, duration, is_downloadable, position
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [
          lecture_id,
          title,
          file_type,
          contentUrl,
          fileSize,
          duration,
          is_downloadable === "true",
          position,
        ]
      );

      await client.query("COMMIT");
      res.json(result.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      // Delete uploaded file if there was an error
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      res.status(500).json({
        error: error.message,
        detail: "Failed to create resource",
      });
    }
  }
);

export default router;
