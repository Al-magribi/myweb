import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiAuth = createApi({
  reducerPath: "ApiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    loadUser: builder.mutation({
      query: () => ({
        url: "/load-user",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useLoadUserMutation,
  useLogoutMutation,
} = ApiAuth;
