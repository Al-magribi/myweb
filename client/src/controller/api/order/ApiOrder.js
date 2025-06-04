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
    getToken: builder.mutation({
      query: (body) => ({
        url: "/get-token",
        method: "POST",
        body,
      }),
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
  useGetTokenMutation,
  useCreateOrderMutation,
  useCheckPaymentMutation,
} = ApiOrder;
