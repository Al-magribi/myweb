import jwt from "jsonwebtoken";
import { client } from "../config/config.js";

export const authorize = (...levels) => {
  return async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Silahkan login terlebih dahulu" });
    }

    try {
      const decode = jwt.verify(token, process.env.KEY);

      const { id } = decode;

      const data = await client.query(`SELECT * FROM users WHERE id = $1`, [
        id,
      ]);

      if (data.rowCount === 0) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      const user = data.rows[0];

      if (!levels.includes(user.level)) {
        return res.status(403).json({ message: "Tidak memiliki otoritas" });
      }

      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
};
