import { Router } from "express";
import { client } from "../../config/config.js";
import axios from "axios";
import SendEmail from "../../utils/sendEmail.js";

const router = Router();

const Link_bonus =
  "https://drive.google.com/drive/folders/1b_AV5TlsXZGs05g4mm97kMZBkFKtzAk1?usp=sharing";

// Function to generate email template
const generateEmailTemplate = (name, itemUrl, type) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
      <h1 style="margin: 0;">Pembayaran Berhasil!</h1>
    </div>
    <div style="padding: 20px; background-color: #f9f9f9;">
      <p style="font-size: 16px; color: #333;">Halo ${name},</p>
      ${
        type === "course"
          ? `
      <p style="font-size: 16px; color: #333;">Gunakan link ini untuk memulai pembelajaran:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="jadidalmagribi.com/auth" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 10px; display: inline-block;">Login untuk Belajar</a>
      </div>
      <p style="font-size: 16px; color: #333; margin-top: 20px;">Email dan password untuk login adalah email yang Anda gunakan saat melakukan pembayaran.</p>
      `
          : `
      <p style="font-size: 16px; color: #333;">Pembayaran anda berhasil, silahkan klik link dibawah ini untuk mengakses produk:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.DOMAIN}${itemUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 10px; display: inline-block;">Akses Produk</a>
        <br/>
        <a href="${Link_bonus}" style="background-color: #2B4C7E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Download Elementor Pro</a>
      </div>
      `
      }
      <p style="font-size: 14px; color: #666;">Terima kasih telah berbelanja di toko kami!</p>
    </div>
    <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 5px 5px;">
      <p style="margin: 0; color: #666; font-size: 12px;">© 2024 Your Store. All rights reserved.</p>
    </div>
  </div>
`;

// Function to get app config
const getAppConfig = async () => {
  const result = await client.query("SELECT * FROM app_config LIMIT 1");
  return result.rows[0];
};

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from(
      process.env.MIDTRANS_SERVER_KEY + ":"
    ).toString("base64")}`,
  },
};

router.post("/create-order", async (req, res) => {
  try {
    const {
      order_id,
      name,
      email,
      phone,
      itemId,
      type,
      quantity = 1,
      status,
      total_amount,
    } = req.body;

    // Validate required fields
    if (
      !order_id ||
      !name ||
      !email ||
      !phone ||
      !itemId ||
      !type ||
      !status ||
      !total_amount
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create order in database
    const data = await client.query(
      `INSERT INTO orders (order_code, name, email, phone, total_amount, type, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [order_id, name, email, phone, total_amount, type, status]
    );

    // Create order items
    if (type === "product") {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [data.rows[0].id, itemId, quantity, total_amount]
      );
    } else {
      await client.query(
        `INSERT INTO c_enrollments (course_id, user_id, status, price)
        VALUES ($1, (SELECT id FROM users WHERE email = $2), $3, $4) RETURNING *`,
        [itemId, email, status, total_amount]
      );

      // If status is settlement, create user account if it doesn't exist
      if (status === "settlement") {
        const userExists = await client.query(
          `SELECT id FROM users WHERE email = $1`,
          [email]
        );

        if (userExists.rows.length === 0) {
          // Create new user with email as username and password
          await client.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4)`,
            [name, email, email, "student"]
          );
        }
      }
    }

    // If status is settlement, send email
    if (status === "settlement") {
      let itemUrl;
      if (type === "product") {
        const productData = await client.query(
          `SELECT p.ebook_url 
           FROM products p
           JOIN order_items oi ON p.id = oi.product_id
           WHERE oi.order_id = $1`,
          [data.rows[0].id]
        );
        itemUrl = productData.rows[0]?.ebook_url;
      } else {
        itemUrl = `/course/${itemId}`;
      }

      const htmlContent = generateEmailTemplate(name, itemUrl, type);
      await SendEmail({
        email: email,
        subject: `Pembayaran Berhasil - Akses ${
          type === "product" ? "Produk" : "Kursus"
        }`,
        message: htmlContent,
      });
    }

    res.status(200).json({
      status: "success",
      message:
        status === "settlement"
          ? "Order completed successfully"
          : "Order pending payment",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
});

const updateStatusOrder = async (status, orderid) => {
  const appConfig = await getAppConfig();

  const result = await client.query(
    `UPDATE orders 
    SET status = $1
    WHERE order_code = $2 RETURNING *`,
    [status, orderid]
  );

  // Send email when status is settlement
  if (status === "settlement") {
    const orderData = result.rows[0];
    let itemUrl;

    if (orderData.type === "product") {
      // Get the product details including pdf_url
      const productData = await client.query(
        `SELECT p.ebook_url 
         FROM products p
         JOIN order_items oi ON p.id = oi.product_id
         WHERE oi.order_id = $1`,
        [orderData.id]
      );
      itemUrl = productData.rows[0]?.ebook_url;
    } else {
      // Get course access URL
      const courseData = await client.query(
        `SELECT c.id, c.title
         FROM c_courses c
         JOIN c_enrollments e ON c.id = e.course_id
         WHERE e.user_id = (SELECT id FROM users WHERE email = $1)
         AND e.status = 'pending'
         ORDER BY e.created_at DESC
         LIMIT 1`,
        [orderData.email]
      );

      if (courseData.rows[0]) {
        // Update enrollment status to active
        await client.query(
          `UPDATE c_enrollments 
           SET status = 'active' 
           WHERE course_id = $1 AND user_id = (SELECT id FROM users WHERE email = $2)`,
          [courseData.rows[0].id, orderData.email]
        );
        itemUrl = `/course/${courseData.rows[0].id}`;

        // Create user account if it doesn't exist
        const userExists = await client.query(
          `SELECT id FROM users WHERE email = $1`,
          [orderData.email]
        );

        if (userExists.rows.length === 0) {
          // Create new user with email as username and password
          await client.query(
            `INSERT INTO users (name, email, password, role)
             VALUES ($1, $2, $3, $4)`,
            [orderData.name, orderData.email, orderData.email, "student"]
          );
        }
      }
    }

    const htmlContent = generateEmailTemplate(
      orderData.name,
      itemUrl,
      orderData.type
    );

    await SendEmail({
      email: orderData.email,
      subject: `Pembayaran Berhasil - Akses ${
        orderData.type === "product" ? "Produk" : "Kursus"
      }`,
      message: htmlContent,
    });
  }
};

router.post("/transaction-notification", async (req, res) => {
  try {
    const data = req.body;

    let orderId = data.order_id;
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraud_status;

    // Sample transactionStatus handling logic
    if (transactionStatus == "capture") {
      if (fraudStatus == "accept") {
        updateStatusOrder(transactionStatus, orderId);
      }
    } else if (transactionStatus == "settlement") {
      updateStatusOrder(transactionStatus, orderId);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      updateStatusOrder(transactionStatus, orderId);
    } else if (transactionStatus == "pending") {
      updateStatusOrder(transactionStatus, orderId);
    }

    res.status(200).json({ status: "success", message: "OK" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Check Order Status
router.post("/check-status", async (req, res) => {
  try {
    const { email, itemId, type } = req.body;

    let data;
    if (type === "product") {
      data = await client.query(
        `SELECT o.*, oi.product_id 
         FROM orders o
         JOIN order_items oi ON o.id = oi.order_id
         WHERE o.email = $1 AND oi.product_id = $2`,
        [email, itemId]
      );
    } else {
      data = await client.query(
        `SELECT o.*, e.course_id 
         FROM orders o
         JOIN c_enrollments e ON e.user_id = (SELECT id FROM users WHERE email = o.email)
         WHERE o.email = $1 AND e.course_id = $2`,
        [email, itemId]
      );
    }

    if (data.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (data.rows[0].status === "settlement") {
      const orderData = data.rows[0];
      let itemUrl;

      if (type === "product") {
        const productData = await client.query(
          `SELECT p.ebook_url 
           FROM products p
           JOIN order_items oi ON p.id = oi.product_id
           WHERE oi.order_id = $1`,
          [orderData.id]
        );
        itemUrl = productData.rows[0]?.ebook_url;
      } else {
        itemUrl = `/course/${data.rows[0].course_id}`;
      }

      const htmlContent = generateEmailTemplate(orderData.name, itemUrl, type);

      await SendEmail({
        email: orderData.email,
        subject: `Pembayaran Berhasil - Akses ${
          type === "product" ? "Produk" : "Kursus"
        }`,
        message: htmlContent,
      });
    }

    const isSettlement = `Order status: ${data.rows[0].status}, Cek inbox atau spam pada email ${data.rows[0].email} untuk melihat ${type}`;
    const isPending = `Order status: ${data.rows[0].status}, silahkan lakukan pembayaran`;

    res.status(200).json({
      message: data.rows[0].status === "settlement" ? isSettlement : isPending,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Add new endpoint for getting Midtrans token
router.post("/get-token", async (req, res) => {
  try {
    const { name, email, phone, itemId, type, quantity = 1 } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !itemId || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get item details based on type
    let item;
    if (type === "product") {
      const result = await client.query(
        `SELECT * FROM products WHERE id = $1`,
        [itemId]
      );
      item = result.rows[0];
    } else if (type === "course") {
      const result = await client.query(
        `SELECT * FROM c_courses WHERE id = $1`,
        [itemId]
      );
      item = result.rows[0];
    } else {
      return res.status(400).json({ message: "Invalid item type" });
    }

    if (!item) {
      return res.status(404).json({ message: `${type} not found` });
    }

    const count = await client.query(`SELECT * FROM orders`);
    const order = `ORDER-${type === "product" ? "P" : "C"}${
      count.rows.length + 1
    }${new Date().getTime()}`;
    const totalAmount = item.price * quantity;
    const itemName = type === "product" ? item.name : item.title;

    // Prepare Midtrans request data
    const dataPayment = {
      transaction_details: {
        order_id: order,
        gross_amount: parseInt(totalAmount),
      },
      item_details: [
        {
          id: itemId.toString(),
          price: parseInt(item.price),
          quantity: quantity,
          name: itemName,
        },
      ],
      customer_details: {
        first_name: name,
        email: email,
        phone: phone,
      },
      enabled_payments: ["bank_transfer", "other_qris"],
      callbacks: {
        finish: `${process.env.DOMAIN}/${type}/${itemId}/${itemName.replace(
          /\s+/g,
          "-"
        )}/status`,
        error: `${process.env.DOMAIN}/${type}/${itemId}/${itemName.replace(
          /\s+/g,
          "-"
        )}/status`,
        pending: `${process.env.DOMAIN}/${type}/${itemId}/${itemName.replace(
          /\s+/g,
          "-"
        )}/status`,
      },
    };

    // Send request to Midtrans
    const response = await axios.post(
      `${process.env.MIDTRANS_BASE_URL}/snap/v1/transactions`,
      dataPayment,
      config
    );

    res.status(200).json({
      token: response.data.token,
      order_id: order,
      total_amount: totalAmount,
      item_name: itemName,
    });
  } catch (error) {
    console.error("Error getting token:", error);
    if (error.response) {
      console.error("Midtrans error response:", error.response.data);
    }
    return res.status(500).json({
      message: "Failed to get token",
      error: error.message,
      details: error.response?.data || {},
    });
  }
});

export default router;
