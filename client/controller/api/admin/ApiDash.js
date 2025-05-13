import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiDash = createApi({
  reducerPath: "ApiDash",
  baseQuery: fetchBaseQuery({ baseUrl: `/api/admin/dashboard` }),
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => "/stats",
    }),
  }),
});

export const { useGetStatsQuery } = ApiDash;
