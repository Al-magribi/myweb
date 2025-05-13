import React from "react";
import { FaPlayCircle, FaPhoneAlt } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className='py-5 bg-primary text-white'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6 text-center text-lg-start'>
            <h1 className='display-4 fw-bold mb-4'>
              Satu Sistem, Semua Kebutuhan Sekolah Terpenuhi
            </h1>
            <p className='lead mb-4'>
              Kelola sekolah lebih mudah, cepat, dan efisien dengan{" "}
              <strong>EduByte</strong>—platform digital terpadu untuk manajemen
              pendidikan modern.
            </p>
            <div className='d-flex gap-3 justify-content-center justify-content-lg-start'>
              <button className='btn btn-light btn-lg px-4'>
                <FaPlayCircle className='me-2' />
                Lihat Demo
              </button>
              <button className='btn btn-outline-light btn-lg px-4'>
                <FaPhoneAlt className='me-2' />
                Hubungi Kami
              </button>
            </div>
          </div>
          <div className='col-lg-6 d-none d-lg-block'>
            <img
              src='/edubyte.jpg'
              alt='EduByte Platform'
              className='img-fluid rounded shadow'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
