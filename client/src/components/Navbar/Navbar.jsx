import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const adminLevel = "/admin";
  const userLevel = "/user-dashboard";

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
          aria-expanded={isOpen}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <button
                className='nav-link border-0 bg-transparent'
                onClick={() => handleHashNavigation("#about")}
              >
                Skills
              </button>
            </li>
            <li className='nav-item'>
              <button
                className='nav-link border-0 bg-transparent'
                onClick={() => handleHashNavigation("#projects")}
              >
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
                onClick={() => handleHashNavigation("#contact")}
              >
                Contact
              </button>
            </li>
            <li className='nav-item'>
              {user?.id ? (
                <Link className='nav-link' to={userLevel}>
                  Dashboard
                </Link>
              ) : (
                <Link className='nav-link' to='/signin'>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
