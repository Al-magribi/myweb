import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-dark text-white py-5'>
      <div className='container'>
        <div className='row g-4'>
          <div className='col-lg-4'>
            <h5 className='mb-4'>About Me</h5>
            <p className='text-white'>
              Full Stack Web Developer specializing in React, Node.js, and
              modern web technologies. Creating scalable and efficient web
              applications.
            </p>
          </div>
          <div className='col-lg-4'>
            <h5 className='mb-4'>Quick Links</h5>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <a href='#home' className='text-decoration-none text-white'>
                  Home
                </a>
              </li>
              <li className='mb-2'>
                <a href='#about' className='text-decoration-none text-white'>
                  Skills
                </a>
              </li>
              <li className='mb-2'>
                <a href='#projects' className='text-decoration-none text-white'>
                  Projects
                </a>
              </li>
              <li className='mb-2'>
                <a href='#contact' className='text-decoration-none text-white'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className='col-lg-4'>
            <h5 className='mb-4'>Contact Info</h5>
            <ul className='list-unstyled text-white'>
              <li className='mb-2 d-flex align-items-center'>
                <FaEnvelope className='me-2' />
                <span>jadidalmagribi@gmail.com</span>
              </li>
              <li className='mb-2 d-flex align-items-center'>
                <FaWhatsapp className='me-2' />
                <a
                  href='https://wa.me/6287720776871'
                  className='text-white text-decoration-none'>
                  +62 877 2077 6871
                </a>
              </li>
            </ul>
            <div className='d-flex gap-3 mt-4'>
              <a href='#' className='text-white'>
                <FaGithub size={20} />
              </a>
              <a href='#' className='text-white'>
                <FaLinkedin size={20} />
              </a>
              <a href='https://wa.me/6287720776871' className='text-white'>
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>
        <hr className='my-4' />
        <div className='text-center text-white'>
          <small>&copy; {new Date().getFullYear()} Jadid Al Magribi</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
