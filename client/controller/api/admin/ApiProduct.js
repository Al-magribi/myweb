import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiProduct = createApi({
  reducerPath: "ApiProduct",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin/product" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit, search }) =>
        `/get-all-product?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ["products"],
    }),
    getProductById: builder.query({
      query: (id) => `/get-product/${id}`,
      providesTags: (result, error, id) => [{ type: "products", id }],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/add-product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    getProductReviews: builder.query({
      query: ({ productId, page = 1, limit = 10 }) =>
        `/get-reviews/${productId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, productId) => [
        { type: "products", id: productId },
      ],
    }),
    addReview: builder.mutation({
      query: (formData) => ({
        url: "/add-review",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "products", id: productId },
        "products",
      ],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/delete-review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "products", id: productId },
        "products",
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
} = ApiProduct;
