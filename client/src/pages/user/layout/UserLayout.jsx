import React, { useState, useEffect, use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

  const { user, isSignin } = useSelector((state) => state.auth);

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
    document.body.classList.add("theme-transition");
  }, [isDarkMode, isSidebarOpen, isIconOnly]);

  const handleOverlayClick = () => {
    if (window.innerWidth < 992) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setLogout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isSignin) {
        navigate("/signin");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isSignin]);

  return (
    <>
      <SEO title={title} />
      <div className={`wrapper ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
          onClick={handleOverlayClick}
        />

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
          style={{ transition: "all 0.3s ease" }}
        >
          <div
            className={`sidebar-header ${
              isDarkMode ? "border-bottom border-dark" : "border-bottom"
            }`}
          >
            <div className='brand-container'>
              <img
                src='/logo.png'
                alt='ALMADEV'
                width={32}
                height={32}
                className='brand-logo'
                style={{ transition: "transform 0.3s ease" }}
              />
              <h3 className={`${isDarkMode ? "text-white" : "text-dark"} mb-0`}>
                ALMADEV
              </h3>
            </div>
          </div>
          <div className='list-group list-group-flush'>
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`list-group-item list-group-item-action ${
                  isDarkMode ? "bg-dark text-white" : "bg-white text-dark"
                } ${location.pathname === item.path ? "active" : ""}`}
                title={isIconOnly ? item.label : ""}
                style={{
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {!isIconOnly && <span>{item.label}</span>}
                {location.pathname === item.path && (
                  <span
                    className='active-indicator'
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "3px",
                      backgroundColor: "#0d6efd",
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}
              </Link>
            ))}
          </div>
        </nav>

        <div
          className={`main-content ${
            window.innerWidth >= 992
              ? isIconOnly
                ? "sidebar-icon-only"
                : ""
              : ""
          } ${isDarkMode ? "bg-dark" : "bg-light"}`}
          style={{ transition: "margin-left 0.3s ease" }}
        >
          <nav
            className={`navbar navbar-expand-lg ${
              isDarkMode
                ? "navbar-dark bg-dark border-bottom border-secondary"
                : "navbar-light bg-white"
            } shadow-sm`}
            style={{ transition: "all 0.3s ease" }}
          >
            <div className='container-fluid'>
              <button
                className={`btn ${
                  isDarkMode ? "btn-outline-light" : "btn-outline-dark"
                } d-flex align-items-center justify-content-center`}
                onClick={toggleSidebar}
                title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                style={{
                  width: "38px",
                  height: "38px",
                  transition: "all 0.2s ease",
                  padding: 0,
                }}
              >
                <i className='bi bi-list'></i>
              </button>
              <span className='navbar-brand ms-2 fw-semibold'>{title}</span>

              <div className='ms-auto d-flex gap-3 align-items-center'>
                <div className='dropdown'>
                  <button
                    className={`btn rounded-circle btn-outline-${
                      isDarkMode ? "light" : "dark"
                    } dropdown-toggle d-flex align-items-center justify-content-center`}
                    type='button'
                    id='userDropdown'
                    data-bs-toggle='dropdown'
                    title='User Menu'
                    style={{
                      width: "38px",
                      height: "38px",
                      transition: "all 0.2s ease",
                      padding: 0,
                    }}
                  >
                    {user?.name ? (
                      <span
                        className='fs-6 fw-medium'
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: isDarkMode
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.1)",
                          borderRadius: "50%",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {user.name
                          .split(" ")
                          .slice(0, 2)
                          .map((name) => name.charAt(0))
                          .join("")
                          .toUpperCase()}
                      </span>
                    ) : (
                      <i className='bi bi-person-circle'></i>
                    )}
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-menu-end ${
                      isDarkMode ? "dropdown-menu-dark" : ""
                    }`}
                  >
                    {USER_MENU_ITEMS.map((item) => (
                      <React.Fragment key={item.path}>
                        <li>
                          <Link
                            className='dropdown-item d-flex align-items-center'
                            to={item.path}
                            style={{ transition: "background-color 0.2s ease" }}
                          >
                            <i className={`bi ${item.icon} me-2`}></i>
                            {item.label}
                          </Link>
                        </li>
                        {item.divider && (
                          <li>
                            <hr className='dropdown-divider' />
                            <button
                              className='dropdown-item d-flex align-items-center text-danger'
                              onClick={handleLogout}
                              style={{
                                transition: "background-color 0.2s ease",
                              }}
                            >
                              <i className='bi bi-box-arrow-right me-2'></i>
                              Logout
                            </button>
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </div>

                <button
                  className={`rounded-circle btn ${
                    isDarkMode ? "btn-outline-light" : "btn-outline-dark"
                  } d-flex align-items-center justify-content-center`}
                  onClick={toggleTheme}
                  title={
                    isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                  }
                  style={{
                    width: "38px",
                    height: "38px",
                    transition: "all 0.2s ease",
                    padding: 0,
                  }}
                >
                  <i className={`bi ${isDarkMode ? "bi-sun" : "bi-moon"}`}></i>
                </button>
              </div>
            </div>
          </nav>

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
