import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import routerAuth from "./routers/auth/routerAuth.js";

//admin
import routerProduct from "./routers/admin/product/routerProduct.js";
import routerDash from "./routers/admin/dash/routerDash.js";
import routerSetting from "./routers/admin/setting/routerSetting.js";

//order
import routerOrder from "./routers/order/routerOrder.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "assets")));
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });

app.use("/api/auth", routerAuth);

// admin
app.use("/api/admin/product", routerProduct);
app.use("/api/admin/dashboard", routerDash);
app.use("/api/admin/setting", routerSetting);

//order
app.use("/api/orders", routerOrder);

export default app;
