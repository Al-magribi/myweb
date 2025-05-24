import "dotenv/config";
import app from "./app.js";
import { connectToDb } from "./config/config.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("/", (res, req) => {
  res.redirect(process.env.DOMAIN);
});

// Handle React routing, return all requests to React app
app.get(/^(?!\/api|\/assets).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

app.listen(process.env.PORT, async () => {
  try {
    await connectToDb();
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
  }
});
