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

    // User
    getCourseByUser: builder.query({
      query: () => "/get-course-by-user",
      providesTags: ["courses"],
    }),

    // Update lecture progress
    updateLectureProgress: builder.mutation({
      query: (data) => ({
        url: "/lectures/update-progress",
        method: "POST",
        body: data,
      }),
    }),

    // Get lecture progress
    getLectureProgress: builder.query({
      query: (lectureId) => `/lectures/progress/${lectureId}`,
    }),

    // Get course progress summary
    getCourseProgress: builder.query({
      query: (courseId) => `/course-progress/${courseId}`,
    }),

    // NEW: Get all lecture progress for a course
    getAllLectureProgress: builder.query({
      query: (courseId) => `/lectures/all-progress/${courseId}`,
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
  useUpdateLectureProgressMutation,
  useGetLectureProgressQuery,
  useGetCourseProgressQuery,

  // Section hooks
  useAddSectionMutation,
  useDeleteSectionMutation,

  // Lecture hooks
  useAddLectureMutation,
  useDeleteLectureMutation,

  // NEW: Get all lecture progress for a course
  useGetAllLectureProgressQuery,
} = ApiCourse;
