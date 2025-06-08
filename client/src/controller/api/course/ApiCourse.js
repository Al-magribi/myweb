import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiCourse = createApi({
  reducerPath: "ApiCourse",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/courses",
    credentials: "include",
    prepareHeaders: (headers) => {
      // Remove the Content-Type header to let the browser set it with the correct boundary for FormData
      headers.delete("Content-Type");
      return headers;
    },
  }),
  tagTypes: ["courses", "sections", "lectures"],
  endpoints: (builder) => ({
    // Course Endpoints
    addCourse: builder.mutation({
      query: (formData) => ({
        url: "/add-course",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["courses"],
    }),

    getCourses: builder.query({
      query: () => "/get-courses",
      providesTags: ["courses"],
    }),

    getCourseById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["courses", "sections", "lectures"],
    }),

    getLandingPage: builder.query({
      query: (id) => `/landing-page/${id}`,
      providesTags: ["courses"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete-course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),

    // User
    getCourseByUser: builder.query({
      query: () => "/get-course-by-user",
      providesTags: ["courses"],
    }),

    // Section Endpoints
    addSection: builder.mutation({
      query: (data) => ({
        url: "/sections/add-section",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sections", "courses"],
    }),

    deleteSection: builder.mutation({
      query: (id) => ({
        url: `/sections/delete-section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sections", "courses"],
    }),

    // Lecture Endpoints
    addLecture: builder.mutation({
      query: (data) => ({
        url: "/lectures/add-lecture",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["lectures", "sections", "courses"],
    }),

    deleteLecture: builder.mutation({
      query: (id) => ({
        url: `/lectures/delete-lecture/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lectures", "sections", "courses"],
    }),
  }),
});

export const {
  // Course hooks
  useAddCourseMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useDeleteCourseMutation,
  useGetLandingPageQuery,

  // User hooks
  useGetCourseByUserQuery,

  // Section hooks
  useAddSectionMutation,
  useDeleteSectionMutation,

  // Lecture hooks
  useAddLectureMutation,
  useDeleteLectureMutation,
} = ApiCourse;
