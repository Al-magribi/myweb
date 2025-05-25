import React, { useState } from "react";
import Layout from "../layout/Layout";
import AddCourseModal from "./AddCourseModal";
import {
  useGetCoursesQuery,
  useAddCourseMutation,
} from "../../../controller/api/admin/ApiCourse";
import toast from "react-hot-toast";

const AdminCourse = () => {
  const { data: courses = [], isLoading, error } = useGetCoursesQuery();
  const [detail, setDetail] = useState({});
  const [addCourse] = useAddCourseMutation();

  const handleAddCourse = async (courseData) => {
    try {
      const result = await addCourse(courseData).unwrap();
      toast.success(result.message);
    } catch (err) {
      console.error("Error details:", err);
      toast.error(err.data?.error || "Failed to create course");
    }
  };

  if (isLoading) {
    return (
      <Layout title='Admin Course'>
        <div
          className='d-flex justify-content-center align-items-center'
          style={{ minHeight: "60vh" }}
        >
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title='Admin Course'>
        <div className='alert alert-danger' role='alert'>
          Error loading courses: {error.data?.message || "Something went wrong"}
        </div>
      </Layout>
    );
  }

  if (courses.length === 0) {
    return (
      <Layout title='Admin Course'>
        <div className='text-end mb-3'>
          <button
            className='btn btn-sm btn-outline-primary'
            data-bs-toggle='modal'
            data-bs-target='#course'
          >
            <i className='bi bi-plus-lg me-2'></i>
            Course
          </button>
        </div>

        <div className='alert alert-info' role='alert'>
          No courses found.
        </div>

        <AddCourseModal onSubmit={handleAddCourse} detail={detail} />
      </Layout>
    );
  }

  return (
    <Layout title='Admin Course'>
      <div className='text-end mb-3'>
        <button
          className='btn btn-sm btn-outline-primary'
          data-bs-toggle='modal'
          data-bs-target='#course'
        >
          <i className='bi bi-plus-lg me-2'></i>
          Course
        </button>
      </div>

      {/* Course Grid */}
      <div className='row g-2'>
        {courses.map((course) => (
          <div key={course.id} className='col-12 col-md-6 col-lg-4'>
            <div className='card h-100 border-0 shadow-sm'>
              <img
                src={course.thumbnail || "https://via.placeholder.com/600x400"}
                className='card-img-top'
                alt={course.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className='card-body'>
                <div className='d-flex justify-content-between align-items-start mb-2'>
                  <span
                    className={`badge ${
                      course.is_published ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {course.is_published ? "Published" : "Draft"}
                  </span>
                  <div className='dropdown'>
                    <button
                      className='btn btn-link text-dark p-0'
                      type='button'
                      data-bs-toggle='dropdown'
                    >
                      <i className='bi bi-three-dots-vertical'></i>
                    </button>
                    <ul className='dropdown-menu dropdown-menu-end'>
                      <li>
                        <button
                          className='dropdown-item'
                          onClick={() => setDetail(course)}
                          data-bs-toggle='modal'
                          data-bs-target='#course'
                        >
                          <i className='bi bi-pencil-square me-2'></i>Edit
                        </button>
                      </li>
                      <li>
                        <button className='dropdown-item text-danger'>
                          <i className='bi bi-trash me-2'></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <h5 className='card-title mb-1'>{course.title}</h5>
                <p className='text-muted small mb-2'>by {course.instructor}</p>

                <div className='mb-3'>
                  <span className='badge bg-info me-2'>{course.category}</span>
                  <span className='badge bg-secondary me-2'>
                    {course.level}
                  </span>
                  <span className='badge bg-light text-dark'>
                    <i className='bi bi-clock me-1'></i>
                    {course.duration} hours
                  </span>
                </div>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                  <div className='d-flex align-items-center'>
                    <i className='bi bi-people me-2'></i>
                    <span>0 students</span>
                  </div>
                  <div className='d-flex align-items-center'>
                    <i className='bi bi-star-fill text-warning me-1'></i>
                    <span>0 (0 reviews)</span>
                  </div>
                </div>
                <h6 className='mb-0 fw-bold'>
                  Rp {parseFloat(course.price).toLocaleString()}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      <AddCourseModal onSubmit={handleAddCourse} detail={detail} />
    </Layout>
  );
};

export default AdminCourse;
