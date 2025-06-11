import { Router } from "express";
import { authorize } from "../../middlewares/authorize.js";
import { client } from "../../config/config.js";
import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/questions");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const uploadImage = multer({ storage: imageStorage });

const router = Router();

// Create a question
router.post("/add-question", authorize("user"), async (req, res) => {
  try {
    const { id, courseId, lectureId, title, question } = req.body;
    const userId = req.user.id;

    if (id) {
      // Update existing question
      await client.query(
        `UPDATE c_questions SET title = $1, question = $2 WHERE id = $3`,
        [title, question, id]
      );
      res.status(200).json({ message: "Question updated successfully" });
    } else {
      // Create new question - get the next ID
      const {
        rows: [maxId],
      } = await client.query(
        `SELECT COALESCE(MAX(id), 0) + 1 as next_id FROM c_questions`
      );

      await client.query(
        `INSERT INTO c_questions (id, user_id, course_id, lecture_id, title, question)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [maxId.next_id, userId, courseId, lectureId, title, question]
      );
      res
        .status(200)
        .json({ message: "Question created successfully", id: maxId.next_id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all questions
router.get("/get-questions", authorize("user", "admin"), async (req, res) => {
  try {
    const { courseId, lectureId, page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    const offset = (page - 1) * limit;

    const query = `SELECT q.*, u.name as user_name FROM c_questions q
      JOIN users u ON q.user_id = u.id
      WHERE q.course_id = $1 AND q.lecture_id = $2
      ORDER BY q.created_at DESC
      LIMIT $3 OFFSET $4`;

    const values = [courseId, lectureId, limit, offset];

    const { rows } = await client.query(query, values);

    res.status(200).json({ questions: rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// delete a question
router.delete("/delete-question", authorize("user"), async (req, res) => {
  try {
    const { id } = req.query;
    await client.query(`DELETE FROM c_questions WHERE id = $1`, [id]);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Upload image editor
router.post("/upload/image", uploadImage.single("file"), (req, res) => {
  try {
    const imageLink = "/assets/questions/" + req.file.filename;

    res.status(200).json({ url: imageLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

export default router;
