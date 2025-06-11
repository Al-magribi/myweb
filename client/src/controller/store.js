import { configureStore } from "@reduxjs/toolkit";
import { ApiAuth } from "./api/ApiAuth";
import sliceAuth from "./slice/sliceAuth";

// Admin
import { ApiProduct } from "./api/product/ApiProduct";
import { ApiDash } from "./api/dash/ApiDash";
import { ApiSetting } from "./api/setting/ApiSetting";
import { ApiCourse } from "./api/course/ApiCourse";
import { ApiQa } from "./api/course/ApiQa";

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
    [ApiQa.reducerPath]: ApiQa.reducer,

    [ApiOrder.reducerPath]: ApiOrder.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ApiAuth.middleware,
      ApiProduct.middleware,
      ApiDash.middleware,
      ApiSetting.middleware,
      ApiCourse.middleware,
      ApiQa.middleware,

      ApiOrder.middleware,
    ]),
  devTools: isDev,
});
