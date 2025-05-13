import { configureStore } from "@reduxjs/toolkit";
import { ApiAuth } from "./api/ApiAuth";
import sliceAuth from "./slice/sliceAuth";

// Admin
import { ApiProduct } from "./api/admin/ApiProduct";
import { ApiDash } from "./api/admin/ApiDash";
import { ApiSetting } from "./api/admin/ApiSetting";

// Order
import { ApiOrder } from "./api/order/ApiOrder";

export const store = configureStore({
  reducer: {
    auth: sliceAuth,
    [ApiAuth.reducerPath]: ApiAuth.reducer,
    [ApiProduct.reducerPath]: ApiProduct.reducer,
    [ApiDash.reducerPath]: ApiDash.reducer,
    [ApiSetting.reducerPath]: ApiSetting.reducer,

    [ApiOrder.reducerPath]: ApiOrder.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ApiAuth.middleware,
      ApiProduct.middleware,
      ApiDash.middleware,
      ApiSetting.middleware,

      ApiOrder.middleware,
    ]),
  devTools: true,
});
