import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiSetting = createApi({
  reducerPath: "ApiSetting",
  baseQuery: fetchBaseQuery({ baseUrl: `/api/admin/setting` }),
  tagTypes: ["Setting"],
  endpoints: (builder) => ({
    getConfig: builder.query({
      query: () => "/get-config",
      providesTags: ["Setting"],
    }),
    updateConfig: builder.mutation({
      query: (data) => ({
        url: "/update-config",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const { useGetConfigQuery, useUpdateConfigMutation } = ApiSetting;
