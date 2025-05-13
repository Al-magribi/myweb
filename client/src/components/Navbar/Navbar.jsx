import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleHashNavigation = (hash) => {
    navigate("/");
    // Use setTimeout to ensure the navigation happens before scrolling
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    setIsOpen(false);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm'>
      <div className='container'>
        <Link className='navbar-brand d-flex align-items-center gap-2' to='/'>
          <img src='/logo.png' alt='logo' width={50} />
          <p className='h4 m-0 text-dark'>ALMADEV</p>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <button
                className='nav-link border-0 bg-transparent'
                onClick={() => handleHashNavigation("#about")}>
                Skills
              </button>
            </li>
            <li className='nav-item'>
              <button
                className='nav-link border-0 bg-transparent'
                onClick={() => handleHashNavigation("#projects")}>
                Projects
              </button>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/courses'>
                Courses
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/products'>
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <button
                className='nav-link border-0 bg-transparent'
                onClick={() => handleHashNavigation("#contact")}>
                Contact
              </button>
            </li>
            {/* <li className='nav-item'>
              <Link className='nav-link' to='/auth'>
                Login
              </Link>
            </li> */}
          </ul>
          <div className='d-flex gap-3 ms-3'>
            <a
              href='https://www.linkedin.com/in/jadid-al-magribi'
              className='text-dark'>
              <FaLinkedin size={20} />
            </a>
            <a href='https://wa.me/6287720776871' className='text-dark'>
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
