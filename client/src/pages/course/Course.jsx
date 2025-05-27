import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useGetCoursesQuery } from "../../controller/api/admin/ApiCourse";
import { toast } from "react-hot-toast";

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const Course = () => {
  const navigate = useNavigate();
  const { data: courses, isLoading } = useGetCoursesQuery();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const countStart = (course) => {
    if (course?.id === 1) {
      return 735;
    } else {
      return 0;
    }
  };

  const landingpage = (course) => {
    if (course?.id === 1) {
      navigate("/js-full-stack-web-developer");
    } else {
      toast.custom((t) => (
        <div
          className={`alert alert-warning alert-dismissible fade show`}
          role="alert"
        >
          <button
            type="button"
            className="btn-sm btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
          <strong>Coming Soon</strong>
        </div>
      ));
    }
  };

  return (
    <Fragment>
      <Navbar />

      <div className="bg-light">
        <main className="container py-5" style={{ marginTop: 80 }}>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {courses?.map((course) => (
                <div key={course.id} className="col-12 col-md-3">
                  <div
                    className="card h-100 border-0 shadow-sm hover-shadow transition"
                    style={{ cursor: "pointer" }}
                    onClick={() => landingpage(course)}
                  >
                    <div className="position-relative">
                      <img
                        src={course.thumbnail}
                        className="card-img-top"
                        alt={course.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="position-absolute top-0 end-0 m-2 badge bg-dark">
                        {course.level}
                      </div>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="mb-2">
                        <span className="badge bg-secondary me-2">
                          {course.category}
                        </span>
                        <small className="text-muted">
                          {course.duration} Hours
                        </small>
                      </div>
                      <h5 className="card-title fw-bold mb-1">
                        {course.title.length > 24
                          ? `${course.title.slice(0, 24)}...`
                          : course.title}
                      </h5>
                      <p className="text-muted small mb-2">
                        {course.instructor}
                      </p>

                      <div className="d-flex align-items-center mb-2">
                        <div className="text-warning me-2">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-half"></i>
                        </div>
                        <small className="text-muted">(4.5)</small>
                      </div>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="text-primary mb-0 fw-bold">
                            {formatPrice(course.price)}
                          </h5>
                          <div className="d-flex align-items-center gap-1">
                            <i className="bi bi-people-fill text-muted"></i>
                            <small className="text-muted">
                              {countStart(course) +
                                Number(course.enrollment_count)}
                            </small>
                            <span className="text-muted">Siswa</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Course;
