import { Router } from "express";
import { client } from "../../config/config.js";

const router = Router();

router.post("/create-review", async (req, res) => {
  const { name, email, rating, reviewComment, productId } = req.body;

  try {
    const check = await client.query(`SELECT * FROM orders WHERE email = $1`, [
      email,
    ]);

    if (check.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "You have not ordered this product" });
    }

    await client.query(
      `INSERT INTO reviews (name, rating, comment, product_id)
    VALUES ($1, $2, $3, $4)`,
      [name, rating, reviewComment, productId]
    );

    res.status(200).json({ message: "Review created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
