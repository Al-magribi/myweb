import { Router } from "express";
import { client } from "../../../config/config.js";

const router = Router();

router.get("/get-config", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM app_config");
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-config", async (req, res) => {
  try {
    const {
      domain,
      mid_server_key,
      mid_client_key,
      mid_merchant_id,
      mid_base_url,
      smtp_host,
      smtp_port,
      smtp_email,
      smtp_pass,
      smtp_from,
      smtp_name,
      meta_pixel,
    } = req.body;

    const result = await client.query(
      `UPDATE app_config 
       SET domain = $1,
           mid_server_key = $2,
           mid_client_key = $3,
           mid_merchant_id = $4,
           mid_base_url = $5,
           smtp_host = $6,
           smtp_port = $7,
           smtp_email = $8,
           smtp_pass = $9,
           smtp_from = $10,
           smtp_name = $11,
           meta_pixel = $12,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = 1
       RETURNING *`,
      [
        domain,
        mid_server_key,
        mid_client_key,
        mid_merchant_id,
        mid_base_url,
        smtp_host,
        smtp_port,
        smtp_email,
        smtp_pass,
        smtp_from,
        smtp_name,
        meta_pixel,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    res.json({
      message: "Configuration updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
