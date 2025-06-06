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
        link_files,
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
            "SELECT thumbnail FROM c_courses WHERE id = $1",
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
          link_files: link_files || "",
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
          `UPDATE c_courses 
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
          `INSERT INTO c_courses (
            title, instructor, category, level, duration, price,
            description, thumbnail, video_preview, objectives,
            requirements, link_files, is_published
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
            link_files || "",
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
    const result = await client.query(`
      SELECT 
        c.*,
        COUNT(e.id) as enrollment_count
      FROM c_courses c
      LEFT JOIN c_enrollments e ON c.id = e.course_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get course by ID with all related data
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Get course details
    const courseResult = await client.query(
      "SELECT * FROM c_courses WHERE id = $1",
      [id]
    );

    if (!courseResult.rows[0]) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    // Get sections with lectures
    const sectionsResult = await client.query(
      "SELECT * FROM c_sections WHERE course_id = $1 ORDER BY position",
      [id]
    );

    const course = courseResult.rows[0];
    const sections = await Promise.all(
      sectionsResult.rows.map(async (section) => {
        const lecturesResult = await client.query(
          "SELECT * FROM c_lectures WHERE section_id = $1 ORDER BY position",
          [section.id]
        );
        return { ...section, lectures: lecturesResult.rows };
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

// Get course for landing page
router.get("/landing-page/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const courseId = parseInt(id);

    if (isNaN(courseId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid course ID",
      });
    }

    const courseQuery = await client.query(
      `SELECT 
        c.*,
        COUNT(e.id) as enrollment_count
      FROM c_courses c
      LEFT JOIN c_enrollments e ON c.id = e.course_id
      WHERE c.id = $1
      GROUP BY c.id`,
      [courseId]
    );

    if (!courseQuery.rows[0]) {
      return res.status(404).json({
        success: false,
        error: "Course not found",
      });
    }

    return res.status(200).json(courseQuery.rows[0]);
  } catch (error) {
    console.error("Landing page error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      detail: error.message,
    });
  }
});
// Delete course
router.delete("/delete-course/:id", authorize("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    // Get course data first to get file paths
    const courseResult = await client.query(
      "SELECT thumbnail, video_preview FROM c_courses WHERE id = $1",
      [id]
    );

    const course = courseResult.rows[0];
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    await client.query("BEGIN");

    // Delete the course (cascade will handle related records)
    await client.query("DELETE FROM c_courses WHERE id = $1", [id]);

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
  const { id, course_id, title, description, position } = req.body;

  try {
    await client.query("BEGIN");

    let result;
    if (id) {
      result = await client.query(
        `UPDATE c_sections 
        SET title = $1, description = $2, position = $3, updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *`,
        [title, description, position, id]
      );
    } else {
      result = await client.query(
        `INSERT INTO c_sections (course_id, title, description, position)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [course_id, title, description, position]
      );
    }

    await client.query("COMMIT");
    res.json({
      message: id
        ? "Section updated successfully"
        : "Section created successfully",
      section: result.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      error: error.message,
      detail: "Failed to create/update section",
    });
  }
});

router.delete(
  "/sections/delete-section/:id",
  authorize("admin"),
  async (req, res) => {
    const { id } = req.params;
    try {
      await client.query("BEGIN");

      // Check if section exists
      const sectionResult = await client.query(
        "SELECT * FROM c_sections WHERE id = $1",
        [id]
      );

      if (!sectionResult.rows[0]) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Section not found" });
      }

      // Delete section (cascade will handle lectures)
      await client.query("DELETE FROM c_sections WHERE id = $1", [id]);

      await client.query("COMMIT");
      res.json({ message: "Section deleted successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).json({
        error: error.message,
        detail: "Failed to delete section",
      });
    }
  }
);

// Lecture Endpoints
router.post("/lectures/add-lecture", authorize("admin"), async (req, res) => {
  const {
    id,
    section_id,
    title,
    description,
    duration,
    video_url,
    position,
    is_preview,
  } = req.body;

  try {
    await client.query("BEGIN");

    let result;
    if (id) {
      result = await client.query(
        `UPDATE c_lectures 
        SET title = $1, description = $2, duration = $3,
            video_url = $4, position = $5, is_preview = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *`,
        [title, description, duration, video_url, position, is_preview, id]
      );
    } else {
      result = await client.query(
        `INSERT INTO c_lectures (
          section_id, title, description, duration,
          video_url, position, is_preview
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          section_id,
          title,
          description,
          duration,
          video_url,
          position,
          is_preview,
        ]
      );
    }

    await client.query("COMMIT");
    res.json({
      message: id
        ? "Lecture updated successfully"
        : "Lecture created successfully",
      lecture: result.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      error: error.message,
      detail: "Failed to create/update lecture",
    });
  }
});

router.delete(
  "/lectures/delete-lecture/:id",
  authorize("admin"),
  async (req, res) => {
    const { id } = req.params;
    try {
      await client.query("BEGIN");

      // Check if lecture exists
      const lectureResult = await client.query(
        "SELECT * FROM c_lectures WHERE id = $1",
        [id]
      );

      if (!lectureResult.rows[0]) {
        await client.query("ROLLBACK");
        return res.status(404).json({ error: "Lecture not found" });
      }

      // Delete lecture
      await client.query("DELETE FROM c_lectures WHERE id = $1", [id]);

      await client.query("COMMIT");
      res.json({ message: "Lecture deleted successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.status(500).json({
        error: error.message,
        detail: "Failed to delete lecture",
      });
    }
  }
);

export default router;
