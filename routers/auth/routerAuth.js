import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../../config/config.js";
import { authorize } from "../../middlewares/authorize.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [name, email, phone, hashedPassword]
    );

    const token = jwt.sign({ id: user.id }, process.env.KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Pendaftaran berhasil", user });
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users WHERE email = $1
    `,
      [email]
    );

    if (!user) {
      return res.status(401).json({ message: "Email  salah" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign({ id: user.id }, process.env.KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login berhasil", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/load-user", authorize("user", "admin"), (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout berhasil" });
});

export default router;
