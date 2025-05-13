import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaProjectDiagram,
  FaBook,
  FaCog,
  FaBars,
  FaTimes,
  FaOpencart,
} from "react-icons/fa";

const Layout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
    },
    {
      path: "/admin/products",
      icon: <FaBox />,
      label: "Products",
    },
    {
      path: "/admin/orders",
      icon: <FaOpencart />,
      label: "Orders",
    },
    {
      path: "/admin/projects",
      icon: <FaProjectDiagram />,
      label: "Projects",
    },
    {
      path: "/admin/courses",
      icon: <FaBook />,
      label: "Courses",
    },
    {
      path: "/admin/settings",
      icon: <FaCog />,
      label: "Settings",
    },
  ];

  return (
    <div className='d-flex'>
      <title>{title}</title>
      {/* Sidebar */}
      <div
        className={`bg-dark text-white sidebar ${
          isSidebarOpen ? "open" : "closed"
        }`}
        style={{
          width: isSidebarOpen ? "250px" : "70px",
          minHeight: "100vh",
          transition: "all 0.3s",
          position: "fixed",
          zIndex: 1000,
        }}>
        <div className='p-3 d-flex justify-content-between align-items-center'>
          {isSidebarOpen && <h5 className='m-0'>Admin Panel</h5>}
          <button
            className='btn btn-link text-white p-0'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <hr className='text-white-50' />
        <ul className='nav flex-column'>
          {menuItems.map((item) => (
            <li key={item.path} className='nav-item'>
              <Link
                to={item.path}
                className={`nav-link text-white d-flex align-items-center ${
                  location.pathname === item.path ? "active bg-primary" : ""
                }`}
                style={{
                  padding: "0.8rem 1rem",
                  transition: "all 0.3s",
                }}>
                <span className='me-3' style={{ minWidth: "20px" }}>
                  {item.icon}
                </span>
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className='flex-grow-1'
        style={{
          marginLeft: isSidebarOpen ? "250px" : "70px",
          transition: "all 0.3s",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}>
        {/* Top Navigation */}
        <nav
          className='navbar navbar-expand-lg navbar-light bg-white shadow-sm'
          style={{ height: "60px" }}>
          <div className='container-fluid'>
            <div className='d-flex align-items-center'>
              <button
                className='btn btn-link text-dark d-lg-none'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <FaBars />
              </button>
              <h5 className='m-0 ms-3'>
                {menuItems.find((item) => item.path === location.pathname)
                  ?.label || "Dashboard"}
              </h5>
            </div>
            <div className='d-flex align-items-center'>
              <div className='dropdown'>
                <button
                  className='btn btn-outline-success dropdown-toggle'
                  type='button'
                  id='userDropdown'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'>
                  <i className='bi bi-person-circle me-2'></i>
                  Admin
                </button>
                <ul
                  className='dropdown-menu dropdown-menu-end'
                  aria-labelledby='userDropdown'>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
