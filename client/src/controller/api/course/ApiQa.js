import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiQa = createApi({
  reducerPath: "ApiQa",
  baseQuery: fetchBaseQuery({ baseUrl: `/api/courses/qa` }),
  tagTypes: ["questions"],
  endpoints: (builder) => ({
    addQuestion: builder.mutation({
      query: (body) => ({
        url: "/add-question",
        method: "POST",
        body,
      }),
      invalidatesTags: ["questions"],
    }),
    getQuestions: builder.query({
      query: ({ courseId, lectureId, page, limit }) => ({
        url: "/get-questions",
        params: { courseId, lectureId, page, limit },
      }),
      providesTags: ["questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/delete-question`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["questions"],
    }),
  }),
});

export const {
  useAddQuestionMutation,
  useGetQuestionsQuery,
  useDeleteQuestionMutation,
} = ApiQa;
