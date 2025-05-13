import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-dark text-white py-5'>
      <div className='container'>
        <div className='row g-4'>
          <div className='col-md-4'>
            <h5 className='mb-4'>Tentang EduByte</h5>
            <p>
              Platform digital terpadu untuk manajemen pendidikan modern yang
              membantu sekolah dalam mengelola semua aspek administrasi dan
              pembelajaran.
            </p>
          </div>
          <div className='col-md-4'>
            <h5 className='mb-4'>Kontak Kami</h5>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <FaEnvelope className='me-2' />
                info@edubyte.com
              </li>
              <li className='mb-2'>
                <FaPhone className='me-2' />
                +62 123 4567 890
              </li>
              <li className='mb-2'>
                <FaMapMarkerAlt className='me-2' />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h5 className='mb-4'>Punya Pertanyaan?</h5>
            <form>
              <div className='mb-3'>
                <input
                  type='email'
                  className='form-control bg-dark text-white border-secondary'
                  placeholder='Email Anda'
                />
              </div>
              <div className='mb-3'>
                <textarea
                  className='form-control bg-dark text-white border-secondary'
                  rows={3}
                  placeholder='Pesan Anda'></textarea>
              </div>
              <button type='submit' className='btn btn-primary'>
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
        <hr className='my-4' />
        <div className='row'>
          <div className='col-md-6'>
            <p className='mb-0'>
              &copy; {new Date().getFullYear()} EduByte. All rights reserved.
            </p>
          </div>
          <div className='col-md-6 text-md-end'>
            <div className='social-links'>
              <a href='#' className='text-white me-3'>
                <FaFacebook />
              </a>
              <a href='#' className='text-white me-3'>
                <FaTwitter />
              </a>
              <a href='#' className='text-white me-3'>
                <FaInstagram />
              </a>
              <a href='#' className='text-white'>
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
