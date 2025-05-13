import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import routerAuth from "./routers/auth/routerAuth.js";
import routerProduct from "./routers/admin/product/routerProduct.js";
import routerDash from "./routers/admin/dash/routerDash.js";
import routerSetting from "./routers/admin/setting/routerSetting.js";
import routerOrder from "./routers/order/routerOrder.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static file serving
app.use("/assets", express.static("assets"));
app.use(express.static("client/dist"));

// API Routes
const apiRouter = express.Router();
apiRouter.use("/auth", routerAuth);
apiRouter.use("/admin/product", routerProduct);
apiRouter.use("/admin/dashboard", routerDash);
apiRouter.use("/admin/setting", routerSetting);
apiRouter.use("/orders", routerOrder);
app.use("/api", apiRouter);

// SPA fallback - must be last
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile("client/dist/index.html", { root: "." });
  }
  next();
});

export default app;
