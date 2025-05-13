import { Router } from "express";
import { client } from "../../../config/config.js";
import { authorize } from "../../../middlewares/authorize.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Storage for product images
const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().getTime();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const uploadProduct = multer({ storage: storageProduct });

const router = Router();

// GET all products with features, specifications, and rating breakdown
router.get("/get-all-product", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    // Base query with search
    let query = `
      SELECT 
        p.id,
        p.name,
        p.price,
        p.image_url as image,
        p.description,
        p.status,
        p.ebook_url as ebook,
        CAST(COALESCE(AVG(r.rating), 0) AS DECIMAL(3,2)) as rating,
        (
      SELECT COALESCE(SUM(quantity), 0)
      FROM order_items oi
      WHERE oi.product_id = p.id
    ) as totalsales,
        (
      SELECT COUNT(*) FROM (
      SELECT id FROM reviews r2
      WHERE r2.product_id = p.id
      ORDER BY r2.created_at ASC
      OFFSET 100
      ) as sub
      ) as reviewcount
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id
    `;

    // Add search condition if search parameter exists
    if (search) {
      query += ` WHERE p.name ILIKE $1 OR p.description ILIKE $1`;
    }

    // Group by and order
    query += `
      GROUP BY p.id
      ORDER BY p.id DESC
      LIMIT $${search ? "2" : "1"} OFFSET $${search ? "3" : "2"}
    `;

    // Execute query with appropriate parameters
    const queryParams = search
      ? [`%${search}%`, limit, offset]
      : [limit, offset];

    const { rows: products } = await client.query(query, queryParams);

    // Ambil fitur untuk setiap produk
    for (const product of products) {
      const { rows: features } = await client.query(
        `SELECT feature FROM product_features WHERE product_id = $1`,
        [product.id]
      );
      product.features = features.map((f) => f.feature);
    }

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) 
      FROM products p
      ${search ? "WHERE p.name ILIKE $1 OR p.description ILIKE $1" : ""}
    `;
    const {
      rows: [{ count }],
    } = await client.query(countQuery, search ? [`%${search}%`] : []);

    res.status(200).json({
      products,
      total: parseInt(count),
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// GET product by id
router.get("/get-product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Get main product data with proper review calculations
    const { rows, rowCount } = await client.query(
      `SELECT 
        p.id,
        p.name,
        p.price,
        p.image_url as image,
        p.description,
        p.status,
        p.ebook_url as ebook,
        CAST(COALESCE(AVG(r.rating), 0) AS DECIMAL(3,2)) as rating,
        COUNT(DISTINCT o.id) as totalSales,
        COUNT(DISTINCT r.id) as reviewCount
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id
      WHERE p.id = $1
      GROUP BY p.id
      LIMIT 1`,
      [id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const product = rows[0];

    // Get product features
    const { rows: features } = await client.query(
      `SELECT feature FROM product_features WHERE product_id = $1`,
      [id]
    );
    product.features = features.map((f) => f.feature);

    // Get rating breakdown
    let ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const { rows: breakdown } = await client.query(
      `SELECT rating, COUNT(*) as count 
       FROM reviews 
       WHERE product_id = $1 
       GROUP BY rating`,
      [id]
    );
    breakdown.forEach((b) => {
      ratingBreakdown[b.rating] = parseInt(b.count);
    });
    product.ratingBreakdown = ratingBreakdown;

    // Get recent reviews
    const { rows: reviews } = await client.query(
      `SELECT 
        r.id,
        r.name,
        r.rating,
        r.comment,
        r.created_at
      FROM reviews r
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
      LIMIT 5`,
      [id]
    );
    product.recentReviews = reviews;

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// POST add/update product (with image and optional ebook)
router.post(
  "/add-product",
  uploadProduct.fields([
    { name: "image", maxCount: 1 },
    { name: "ebook", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id, name, price, description, status, type, features } = req.body;
      let image_url = null;
      let ebook_url = null;

      // Handle image file
      if (req.files && req.files.image && req.files.image[0]) {
        image_url = `/assets/products/${req.files.image[0].filename}`;
      }

      // Handle ebook file
      if (req.files && req.files.ebook && req.files.ebook[0]) {
        ebook_url = `/assets/products/${req.files.ebook[0].filename}`;
      }

      let product_id;

      if (id) {
        // Ambil data lama
        const {
          rows: [oldProduct],
        } = await client.query(
          `SELECT image_url, ebook_url FROM products WHERE id = $1`,
          [id]
        );

        // Hapus file lama jika ada file baru diupload
        if (image_url && oldProduct?.image_url) {
          const oldImagePath = path.join(process.cwd(), oldProduct.image_url);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        if (ebook_url && oldProduct?.ebook_url) {
          const oldEbookPath = path.join(process.cwd(), oldProduct.ebook_url);
          if (fs.existsSync(oldEbookPath)) {
            fs.unlinkSync(oldEbookPath);
          }
        }

        // Update existing product
        const updateFields = [];
        const updateValues = [];
        let paramCount = 1;

        updateFields.push(`name = $${paramCount++}`);
        updateValues.push(name);

        updateFields.push(`price = $${paramCount++}`);
        updateValues.push(price);

        updateFields.push(`description = $${paramCount++}`);
        updateValues.push(description);

        updateFields.push(`status = $${paramCount++}`);
        updateValues.push(status);

        if (image_url) {
          updateFields.push(`image_url = $${paramCount++}`);
          updateValues.push(image_url);
        }

        if (ebook_url) {
          updateFields.push(`ebook_url = $${paramCount++}`);
          updateValues.push(ebook_url);
        }

        // Add id to the end of values array
        updateValues.push(id);

        const updateQuery = `
          UPDATE products 
          SET ${updateFields.join(", ")}, updated_at = CURRENT_TIMESTAMP
          WHERE id = $${paramCount}
          RETURNING id
        `;

        const { rows } = await client.query(updateQuery, updateValues);
        product_id = rows[0].id;

        // Delete existing features
        await client.query(
          `DELETE FROM product_features WHERE product_id = $1`,
          [id]
        );
      } else {
        // Insert new product
        const insertProduct = await client.query(
          `INSERT INTO products (name, price, image_url, ebook_url, description, status) 
           VALUES ($1, $2, $3, $4, $5, $6) 
           RETURNING id`,
          [name, price, image_url, ebook_url, description, status]
        );
        product_id = insertProduct.rows[0].id;
      }

      // Insert features
      if (features) {
        const featuresArr = Array.isArray(features)
          ? features
          : JSON.parse(features);
        for (const feature of featuresArr) {
          await client.query(
            `INSERT INTO product_features (product_id, feature) VALUES ($1, $2)`,
            [product_id, feature]
          );
        }
      }

      res.status(201).json({
        message: id
          ? "Product updated successfully"
          : "Product created successfully",
        product_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

// DELETE product and its associated files
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // First get the product details to get file paths
    const {
      rows: [product],
    } = await client.query(
      `SELECT image_url, ebook_url FROM products WHERE id = $1`,
      [id]
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete associated files if they exist
    if (product.image_url) {
      const imagePath = path.join(process.cwd(), product.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    if (product.ebook_url) {
      const ebookPath = path.join(process.cwd(), product.ebook_url);
      if (fs.existsSync(ebookPath)) {
        fs.unlinkSync(ebookPath);
      }
    }

    // Delete product features first (due to foreign key constraint)
    await client.query(`DELETE FROM product_features WHERE product_id = $1`, [
      id,
    ]);

    // Delete product
    await client.query(`DELETE FROM products WHERE id = $1`, [id]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Add new endpoint for adding reviews
router.post("/add-review", async (req, res) => {
  try {
    const { name, email, rating, reviewComment, productId } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Check if user has ordered the product
    const check = await client.query(`SELECT * FROM orders WHERE email = $1`, [
      email,
    ]);

    if (check.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "You have not ordered this product" });
    }

    // Check if product exists
    const { rowCount } = await client.query(
      "SELECT id FROM products WHERE id = $1",
      [productId]
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add review
    const { rows } = await client.query(
      `INSERT INTO reviews (name, rating, comment, product_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, rating, comment, created_at`,
      [name, rating, reviewComment, productId]
    );

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Add endpoint for getting product reviews with pagination
router.get("/get-reviews/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get reviews with pagination
    const { rows: reviews } = await client.query(
      `SELECT 
        r.id,
        r.name,
        r.rating,
        r.comment,
        r.created_at
      FROM reviews r
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
      LIMIT $2 OFFSET $3`,
      [productId, limit, offset]
    );

    // Get total count for pagination
    const {
      rows: [{ count }],
    } = await client.query(
      "SELECT COUNT(*) FROM reviews WHERE product_id = $1",
      [productId]
    );

    res.status(200).json({
      reviews,
      total: parseInt(count),
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-review/:id", async (req, res) => {
  try {
    const { id } = req.query;
    await client.query(`DELETE FROM reviews WHERE id = $1`, [id]);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
export default router;
