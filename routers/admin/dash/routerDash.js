import { Router } from "express";
import { client } from "../../../config/config.js";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    // Get total users count
    const usersCount = await client.query(
      "SELECT COUNT(*) as count FROM users WHERE level = 'user'"
    );

    // Get total products count
    const productsCount = await client.query(
      "SELECT COUNT(*) as count FROM products"
    );

    // Get total orders and revenue
    const ordersStats = await client.query(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0) as total_revenue
      FROM orders
    `);

    // Get recent orders with user details
    const recentOrders = await client.query(`
      SELECT 
        o.id,
        o.order_code,
        o.name,
        o.email,
        o.phone,
        o.total_amount,
        o.status,
        o.created_at
      FROM orders o
      ORDER BY o.created_at DESC
      LIMIT 5
    `);

    // Get top selling products
    const topProducts = await client.query(`
      SELECT 
        p.id,
        p.name,
        COUNT(oi.id) as total_sales,
        SUM(oi.quantity) as total_quantity
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      GROUP BY p.id, p.name
      ORDER BY total_quantity DESC
      LIMIT 3
    `);

    res.json({
      stats: {
        totalUsers: parseInt(usersCount.rows[0].count),
        totalProducts: parseInt(productsCount.rows[0].count),
        totalOrders: parseInt(ordersStats.rows[0].total_orders),
        totalRevenue: parseFloat(ordersStats.rows[0].total_revenue),
      },
      recentOrders: recentOrders.rows,
      topProducts: topProducts.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
