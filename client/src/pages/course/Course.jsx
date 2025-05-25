import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const createMarkup = (html) => {
  return { __html: html };
};

const courses = [
  {
    title: "Javascript Full Stack Web Developer",
    img: "https://res.cloudinary.com/dmsxwwfb5/image/upload/v1595866967/full-stack-devlopment-min.png",
    link: "/full-stack-web-developer",
  },
  {
    title: "Ecommerce TOSERBA",
    img: "https://idwebhost.com/blog/wp-content/uploads/2025/01/mern-a-1.webp",
    link: "/ecommerce-toserba",
  },
];

const Course = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Fragment>
      <Navbar />

      <div className='bg-light'>
        <main className='container py-5' style={{ marginTop: 80 }}>
          <div className='row g-4'>
            {courses.map((course, index) => (
              <div key={index} className='col-12 col-md-3'>
                <div className='card pointer h-100 border-0 shadow-sm hover-shadow transition'>
                  <div className='position-relative'>
                    <img
                      src={course.img}
                      className='card-img-top'
                      alt={course.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </div>
                  <div className='card-body'>
                    <h5 className='card-title fw-bold h-50'>{course.title}</h5>
                    <small className='text-muted'>Jadid Al Magrbi</small>

                    <div className='d-flex align-items-center'>
                      <div className='text-warning me-2'>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-half'></i>
                      </div>
                      <small className='text-muted'>(4.5)</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Course;
