import { configureStore } from "@reduxjs/toolkit";
import { ApiAuth } from "./api/ApiAuth";
import sliceAuth from "./slice/sliceAuth";

// Admin
import { ApiProduct } from "./api/admin/ApiProduct";
import { ApiDash } from "./api/admin/ApiDash";
import { ApiSetting } from "./api/admin/ApiSetting";
import { ApiCourse } from "./api/admin/ApiCourse";

// Order
import { ApiOrder } from "./api/order/ApiOrder";

const isDev = import.meta.env.VITE_MODE === "development";

export const store = configureStore({
  reducer: {
    auth: sliceAuth,
    [ApiAuth.reducerPath]: ApiAuth.reducer,
    [ApiProduct.reducerPath]: ApiProduct.reducer,
    [ApiDash.reducerPath]: ApiDash.reducer,
    [ApiSetting.reducerPath]: ApiSetting.reducer,
    [ApiCourse.reducerPath]: ApiCourse.reducer,

    [ApiOrder.reducerPath]: ApiOrder.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ApiAuth.middleware,
      ApiProduct.middleware,
      ApiDash.middleware,
      ApiSetting.middleware,
      ApiCourse.middleware,

      ApiOrder.middleware,
    ]),
  devTools: isDev,
});
