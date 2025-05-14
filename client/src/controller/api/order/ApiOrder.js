import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiOrder = createApi({
  reducerPath: "ApiOrder",
  baseQuery: fetchBaseQuery({ baseUrl: `/api/orders` }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: "/get-orders",
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/create-order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    checkPayment: builder.mutation({
      query: (body) => ({
        url: "/check-status",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useCheckPaymentMutation,
} = ApiOrder;
