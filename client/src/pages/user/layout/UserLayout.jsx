import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../../controller/api/ApiAuth";
import { setLogout } from "../../../controller/slice/sliceAuth";
import SEO from "../../../components/SEO/SEO";
import "./UserLayout.css";

const MENU_ITEMS = [
  {
    path: "/user-dashboard",
    icon: "bi-speedometer2",
    label: "Dashboard",
  },
  {
    path: "/user-payment",
    icon: "bi-credit-card",
    label: "Payments",
  },
  {
    path: "/user-learning",
    icon: "bi-mortarboard",
    label: "My Learnings",
  },
  {
    path: "/user-product",
    icon: "bi-box",
    label: "My Products",
  },
  {
    path: "/referal-program",
    icon: "bi-share",
    label: "Referal Program",
  },
];

const USER_MENU_ITEMS = [
  {
    path: "/user-profile",
    icon: "bi-person",
    label: "Profile",
  },
  {
    path: "/user-settings",
    icon: "bi-gear",
    label: "Settings",
    divider: true,
  },
];

const UserLayout = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedState = localStorage.getItem("sidebarState");
    return savedState ? JSON.parse(savedState) : true;
  });

  const [isIconOnly, setIsIconOnly] = useState(() => {
    const savedState = localStorage.getItem("sidebarIconOnly");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleSidebar = () => {
    if (window.innerWidth >= 992) {
      setIsIconOnly(!isIconOnly);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("sidebarState", JSON.stringify(isSidebarOpen));
    localStorage.setItem("sidebarIconOnly", JSON.stringify(isIconOnly));
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, isSidebarOpen, isIconOnly]);

  // Close sidebar when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (window.innerWidth < 992) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <SEO title={title} />
      <div className={`wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        {/* Sidebar Overlay */}
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
          onClick={handleOverlayClick}
        />

        {/* Sidebar */}
        <nav
          className={`sidebar ${
            window.innerWidth >= 992
              ? isIconOnly
                ? "icon-only"
                : ""
              : isSidebarOpen
              ? "show"
              : ""
          } ${isDarkMode ? "bg-dark" : "bg-white border-end"}`}
        >
          <div
            className={`sidebar-header ${
              isDarkMode ? "border-bottom border-dark" : "border-bottom"
            }`}
          >
            <div className="brand-container">
              <img src="/logo.png" alt="ALMADEV" width={32} height={32} />
              <h3 className={`${isDarkMode ? "text-white" : "text-dark"}`}>
                ALMADEV
              </h3>
            </div>
            <div
              className={`sidebar-toggle ${
                isDarkMode ? "text-white" : "text-dark"
              }`}
              onClick={toggleSidebar}
              title={isIconOnly ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <i
                className={`bi ${
                  isIconOnly ? "bi-chevron-right" : "bi-chevron-left"
                }`}
              ></i>
            </div>
          </div>
          <div className="list-group list-group-flush">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`list-group-item list-group-item-action ${
                  isDarkMode ? "bg-dark text-white" : "bg-white text-dark"
                } ${location.pathname === item.path ? "active" : ""}`}
                title={isIconOnly ? item.label : ""}
              >
                <i className={`bi ${item.icon}`}></i>
                {!isIconOnly && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <div
          className={`main-content ${
            window.innerWidth >= 992
              ? isIconOnly
                ? "sidebar-icon-only"
                : ""
              : ""
          } ${isDarkMode ? "bg-dark" : "bg-light"}`}
        >
          {/* Navbar */}
          <nav
            className={`navbar navbar-expand-lg ${
              isDarkMode
                ? "navbar-dark bg-dark border-bottom border-secondary"
                : "navbar-light bg-white"
            } shadow-sm`}
          >
            <div className="container-fluid">
              <button
                className={`btn ${
                  isDarkMode ? "btn-outline-light" : "btn-outline-dark"
                }`}
                onClick={toggleSidebar}
                title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
              >
                <i className="bi bi-list"></i>
              </button>
              <span className="navbar-brand ms-2">{title}</span>

              <div className="ms-auto d-flex gap-2 align-items-center">
                <div className="dropdown">
                  <button
                    className={`btn btn-outline-${
                      isDarkMode ? "light" : "dark"
                    } dropdown-toggle`}
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    title="User Menu"
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-end ${
                      isDarkMode ? "dropdown-menu-dark" : ""
                    }`}
                  >
                    {USER_MENU_ITEMS.map((item) => (
                      <React.Fragment key={item.path}>
                        <li>
                          <a className="dropdown-item" href={item.path}>
                            <i className={`bi ${item.icon} me-2`}></i>
                            {item.label}
                          </a>
                        </li>
                        {item.divider && (
                          <li>
                            <hr className="dropdown-divider" />
                            <button
                              className="dropdown-item"
                              onClick={handleLogout}
                            >
                              <i className="bi bi-box-arrow-right me-2"></i>
                              Logout
                            </button>
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>

                {/* Theme Toggle Button */}
                <button
                  className={`btn ${
                    isDarkMode ? "btn-outline-light" : "btn-outline-dark"
                  } me-2`}
                  onClick={toggleTheme}
                  title={
                    isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                >
                  <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon"}`}></i>
                </button>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div
            className={`container-fluid p-4 ${
              isDarkMode ? "text-white" : "text-dark"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
