import React, { useState, useEffect } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 992);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 992);
      if (window.innerWidth >= 992) {
        setShowSidebarMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Sidebar component
  const Sidebar = (
    <div
      className={`bg-dark text-white sidebar ${
        isSidebarOpen || showSidebarMobile ? "open" : "closed"
      }`}
      style={{
        width: isSidebarOpen || showSidebarMobile ? "250px" : "70px",
        minHeight: "100vh",
        transition: "all 0.3s",
        position: window.innerWidth < 992 ? "fixed" : "fixed",
        zIndex: 1100,
        left: 0,
        top: 0,
        display:
          isSidebarOpen || showSidebarMobile
            ? "block"
            : window.innerWidth < 992
            ? "none"
            : undefined,
        boxShadow:
          window.innerWidth < 992 && showSidebarMobile
            ? "2px 0 8px rgba(0,0,0,0.2)"
            : undefined,
      }}
    >
      <div className="p-3 d-flex justify-content-between align-items-center">
        {(isSidebarOpen || showSidebarMobile) && (
          <h5 className="m-0">Admin Panel</h5>
        )}
        <button
          className="btn btn-link text-white p-0"
          onClick={() => {
            if (window.innerWidth < 992) setShowSidebarMobile(false);
            else setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <FaTimes />
        </button>
      </div>
      <hr className="text-white-50" />
      <ul className="nav flex-column">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link text-white d-flex align-items-center ${
                location.pathname === item.path ? "active bg-primary" : ""
              }`}
              style={{
                padding: "0.8rem 1rem",
                transition: "all 0.3s",
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                if (window.innerWidth < 992) setShowSidebarMobile(false);
              }}
            >
              <span className="me-3" style={{ minWidth: "20px" }}>
                {item.icon}
              </span>
              {(isSidebarOpen || showSidebarMobile) && (
                <span>{item.label}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="d-flex">
      <title>{title}</title>
      {/* Sidebar for desktop and mobile overlay */}
      {window.innerWidth >= 992 ? Sidebar : showSidebarMobile && Sidebar}
      {/* Overlay for mobile */}
      {showSidebarMobile && window.innerWidth < 992 && (
        <div
          className="position-fixed bg-dark"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
            zIndex: 1099,
          }}
          onClick={() => setShowSidebarMobile(false)}
        />
      )}
      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft:
            window.innerWidth < 992 ? 0 : isSidebarOpen ? "250px" : "70px",
          transition: "all 0.3s",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          width: "100%",
        }}
      >
        {/* Top Navigation */}
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
          style={{ height: "60px" }}
        >
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              {/* Hamburger button for mobile */}
              {window.innerWidth < 992 && (
                <button
                  className="btn btn-link text-dark me-2"
                  onClick={() => setShowSidebarMobile(true)}
                >
                  <FaBars />
                </button>
              )}
              <h5 className="m-0 ms-3">
                {menuItems.find((item) => item.path === location.pathname)
                  ?.label || "Dashboard"}
              </h5>
            </div>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button
                  className="btn btn-outline-success dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2"></i>
                  Admin
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
