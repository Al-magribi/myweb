import React, { useState, useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import Pagination from "../../../components/Pagination/Pagination";
import { useGetCourseByUserQuery } from "../../../controller/api/course/ApiCourse";
import { Link } from "react-router-dom";

const UserLearning = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const coursesPerPage = 6;

  const { data: enrolledCourses, isLoading, error } = useGetCourseByUserQuery();

  // Filter and sort courses
  const filteredCourses = enrolledCourses
    ? enrolledCourses
        .filter((course) => {
          const matchesSearch = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCategory =
            !selectedCategory || course.category === selectedCategory;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "recent":
              return new Date(b.enrollment_date) - new Date(a.enrollment_date);
            case "title":
              return a.title.localeCompare(b.title);
            default:
              return 0;
          }
        })
    : [];

  // Calculate pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get unique categories for filter dropdown
  const categories = enrolledCourses
    ? [...new Set(enrolledCourses.map((course) => course.category))]
    : [];

  if (isLoading) {
    return (
      <UserLayout title='My Learning'>
        <div className='text-center py-5'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    console.log(error);
    return (
      <UserLayout title='My Learning'>
        <div className='alert alert-danger' role='alert'>
          Error loading courses. Please try again later.
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout title='My Learning'>
      {/* Search and Filter Section */}
      <div className='row mb-4'>
        <div className='col-md-6'>
          <div className='input-group'>
            <span className='input-group-text border-end-0'>
              <i className='bi bi-search'></i>
            </span>
            <input
              type='text'
              className='form-control border-start-0'
              placeholder='Search your courses...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className='col-md-6 d-flex justify-content-md-end mt-3 mt-md-0 gap-2'>
          <select
            className='form-select w-auto'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=''>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className='form-select w-auto'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value='recent'>Recently Enrolled</option>
            <option value='title'>Course Title</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className='row g-4'>
        {currentCourses.length > 0 ? (
          currentCourses.map((course) => (
            <div key={course.id} className='col-md-6 col-lg-4'>
              <div className='card h-100 border-0 shadow-sm'>
                <img
                  src={course.thumbnail}
                  className='card-img-top'
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className='card-body'>
                  <div className='d-flex justify-content-between align-items-start mb-2'>
                    <span className='badge bg-primary'>{course.category}</span>
                    <small>
                      Enrolled:{" "}
                      {new Date(course.enrollment_date).toLocaleDateString()}
                    </small>
                  </div>
                  <h5 className='card-title mb-1'>{course.title}</h5>
                  <p className='small mb-2'>by {course.instructor}</p>

                  <div className='progress mb-3' style={{ height: "5px" }}>
                    <div
                      className='progress-bar bg-primary'
                      role='progressbar'
                      style={{ width: `${course.progress}%` }}
                      aria-valuenow={course.progress}
                      aria-valuemin='0'
                      aria-valuemax='100'
                    ></div>
                  </div>

                  <div className='d-flex justify-content-between align-items-center'>
                    <span className='small'>
                      {course.completed_lessons} of {course.total_lessons}{" "}
                      lessons
                    </span>
                    <span className='fw-bold'>{course.progress}%</span>
                  </div>
                </div>
                <div className='card-footer bg-transparent border-0'>
                  <div className='d-grid'>
                    <Link
                      to={`/course/${course.id}`}
                      className='btn btn-primary'
                    >
                      <i className='bi bi-play-circle me-2'></i>
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-12 text-center py-5'>
            <h4>No courses found</h4>
            <p className='text-muted'>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-4'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </UserLayout>
  );
};

export default UserLearning;
