import React, { useState, useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import Pagination from "../../../components/Pagination/Pagination";

const UserLearning = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Sample data - replace with actual data from your backend
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development",
      instructor: "John Doe",
      progress: 75,
      thumbnail: "https://placehold.co/600x400",
      totalLessons: 24,
      completedLessons: 18,
      lastAccessed: "2024-03-15",
      category: "Web Development",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      instructor: "Jane Smith",
      progress: 45,
      thumbnail: "https://placehold.co/600x400",
      totalLessons: 18,
      completedLessons: 8,
      lastAccessed: "2024-03-14",
      category: "Design",
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      instructor: "Mike Johnson",
      progress: 90,
      thumbnail: "https://placehold.co/600x400",
      totalLessons: 30,
      completedLessons: 27,
      lastAccessed: "2024-03-13",
      category: "Mobile Development",
    },
  ];

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <UserLayout title="My Learning">
      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search your courses..."
            />
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0 gap-2">
          <select className="form-select w-auto">
            <option value="">All Categories</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="design">Design</option>
          </select>
          <select className="form-select w-auto">
            <option value="progress">Sort by Progress</option>
            <option value="recent">Recently Accessed</option>
            <option value="title">Course Title</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={course.thumbnail}
                className="card-img-top"
                alt={course.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-primary">{course.category}</span>
                  <small>Last accessed: {course.lastAccessed}</small>
                </div>
                <h5 className="card-title mb-1">{course.title}</h5>
                <p className="small mb-2">by {course.instructor}</p>

                <div className="progress mb-3" style={{ height: "5px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${course.progress}%` }}
                    aria-valuenow={course.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="small">
                    {course.completedLessons} of {course.totalLessons} lessons
                  </span>
                  <span className="fw-bold">{course.progress}%</span>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0">
                <div className="d-grid">
                  <button className="btn btn-primary">
                    <i className="bi bi-play-circle me-2"></i>
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </UserLayout>
  );
};

export default UserLearning;
