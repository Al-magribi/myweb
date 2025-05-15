import { Router } from "express";
import { client } from "../../config/config.js";
import axios from "axios";
import SendEmail from "../../utils/sendEmail.js";

const router = Router();

// Function to get app config
const getAppConfig = async () => {
  const result = await client.query("SELECT * FROM app_config LIMIT 1");
  return result.rows[0];
};

const config = {
  authorization: `Basic ${Buffer.from(
    process.env.MIDTRANS_SERVER_KEY + ":"
  ).toString("base64")}`,
  baseUrl: process.env.MIDTRANS_BASE_URL,
};

router.post("/create-order", async (req, res) => {
  try {
    const { name, email, phone, productid, quantity = 1, url } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !productid) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get product details
    const product = await client.query(`SELECT * FROM products WHERE id = $1`, [
      productid,
    ]);

    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const count = await client.query(`SELECT * FROM orders`);
    const order = `ORDER-P${count.rows.length + 1}${new Date().getTime()}`;
    const totalAmount = product.rows[0].price * quantity;

    // Create order in database
    const data = await client.query(
      `INSERT INTO orders (order_code, name, email, phone, total_amount)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [order, name, email, phone, totalAmount]
    );

    // Create order items
    await client.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.rows[0].id, productid, quantity, product.rows[0].price]
    );

    // Prepare Midtrans request data
    const dataPayment = {
      transaction_details: {
        order_id: order,
        gross_amount: Number(totalAmount),
      },
      item_details: [
        {
          id: product.rows[0].id,
          price: Number(product.rows[0].price),
          quantity: quantity,
          name: product.rows[0].name,
        },
      ],
      customer_details: {
        first_name: name,
        email: email,
        phone: phone,
      },
      callbacks: {
        finish: `${
          process.env.DOMAIN
        }/product/${productid}/${product.rows[0].name.replace(
          /\s+/g,
          "-"
        )}/status`,
        error: `${
          process.env.DOMAIN
        }/product/${productid}/${product.rows[0].name.replace(
          /\s+/g,
          "-"
        )}/status`,
        pending: `${
          process.env.DOMAIN
        }/product/${productid}/${product.rows[0].name.replace(
          /\s+/g,
          "-"
        )}/status`,
      },
    };

    // Send request to Midtrans
    const response = await axios.post(
      `${process.env.MIDTRANS_BASE_URL}/snap/v1/transactions`,
      dataPayment,
      {
        headers: {
          ...config,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.status(200).json(response.data);
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

    // Get the product details including pdf_url
    const productData = await client.query(
      `SELECT p.ebook_url 
       FROM products p
       JOIN order_items oi ON p.id = oi.product_id
       WHERE oi.order_id = $1`,
      [orderData.id]
    );

    const ebookUrl = productData.rows[0]?.ebook_url;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
          <h1 style="margin: 0;">Pembayaran Berhasil!</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Halo ${orderData.name},</p>
          <p style="font-size: 16px; color: #333;">Pembayaran anda berhasil, silahkan klik link dibawah ini untuk mengakses produk:</p>
         <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.DOMAIN}${ebookUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Akses Produk</a>
          </div>
          <p style="font-size: 14px; color: #666;">Terima kasih telah berbelanja di toko kami!</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 5px 5px;">
          <p style="margin: 0; color: #666; font-size: 12px;">© 2024 Your Store. All rights reserved.</p>
        </div>
      </div>
    `;

    await SendEmail({
      email: orderData.email,
      subject: "Pembayaran Berhasil - Akses Produk",
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
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        updateStatusOrder(transactionStatus, orderId);
      }
    } else if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      updateStatusOrder(transactionStatus, orderId);
    } else if (
      transactionStatus == "cancel" ||
      transactionStatus == "deny" ||
      transactionStatus == "expire"
    ) {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      updateStatusOrder(transactionStatus, orderId);
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
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
    const appConfig = await getAppConfig();

    const { email, productid } = req.body;

    const data = await client.query(
      `SELECT o.*, oi.product_id 
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE o.email = $1 AND oi.product_id = $2`,
      [email, productid]
    );

    if (data.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (data.rows[0].status === "settlement") {
      const orderData = data.rows[0];
      const productData = await client.query(
        `SELECT p.ebook_url 
       FROM products p
       JOIN order_items oi ON p.id = oi.product_id
       WHERE oi.order_id = $1`,
        [orderData.id]
      );

      const ebookUrl = productData.rows[0]?.ebook_url;
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
          <h1 style="margin: 0;">Pembayaran Berhasil!</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p style="font-size: 16px; color: #333;">Halo ${orderData.name},</p>
          <p style="font-size: 16px; color: #333;">Pembayaran anda berhasil, silahkan klik link dibawah ini untuk mengakses produk:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.DOMAIN}${ebookUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Akses Produk</a>
          </div>
          <p style="font-size: 14px; color: #666;">Terima kasih telah berbelanja di toko kami!</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 5px 5px;">
          <p style="margin: 0; color: #666; font-size: 12px;">© 2024 Your Store. All rights reserved.</p>
        </div>
      </div>
    `;

      await SendEmail({
        email: orderData.email,
        subject: "Pembayaran Berhasil - Akses Produk",
        message: htmlContent,
      });
    }

    const isSettlement = `Order status: ${data.rows[0].status}, Cek inbox atau spam pada email ${data.rows[0].email} untuk melihat produk`;
    const isPending = `Order status: ${data.rows[0].status}, silahkan lakukan pembayaran`;

    res.status(200).json({
      message: data.rows[0].status === "settlement" ? isSettlement : isPending,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
