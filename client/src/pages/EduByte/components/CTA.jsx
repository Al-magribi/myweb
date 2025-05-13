import React from "react";
import { FaRocket, FaCalendarAlt } from "react-icons/fa";

const CTA = () => {
  return (
    <section className='py-5 bg-primary text-white'>
      <div className='container'>
        <div className='row justify-content-center text-center'>
          <div className='col-lg-8'>
            <h2 className='display-5 mb-4'>Siap Transformasi Sekolah Anda?</h2>
            <p className='lead mb-5'>
              Daftar sekarang atau jadwalkan demo dengan tim kami.
            </p>
            <div className='d-flex gap-3 justify-content-center'>
              <button className='btn btn-light btn-lg px-4'>
                <FaRocket className='me-2' />
                Coba Gratis Sekarang
              </button>
              <button className='btn btn-outline-light btn-lg px-4'>
                <FaCalendarAlt className='me-2' />
                Jadwalkan Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
