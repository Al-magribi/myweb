import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import routerAuth from "./routers/auth/routerAuth.js";
import routerProduct from "./routers/admin/product/routerProduct.js";
import routerDash from "./routers/admin/dash/routerDash.js";
import routerSetting from "./routers/admin/setting/routerSetting.js";
import routerOrder from "./routers/order/routerOrder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/auth", routerAuth);
app.use("/api/admin/product", routerProduct);
app.use("/api/admin/dashboard", routerDash);
app.use("/api/admin/setting", routerSetting);
app.use("/api/orders", routerOrder);

// Static file serving for assets
app.use("/assets", express.static(path.join(__dirname, "assets")));

export default app;
