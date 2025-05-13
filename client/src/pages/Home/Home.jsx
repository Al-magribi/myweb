import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaCode,
  FaDatabase,
  FaServer,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";

const Home = () => {
  const projects = [
    {
      title: "EduByte - Sistem Informasi Sekolah",
      stack: ["React", "Node.js", "PostgreSQL", "Redux", "bootstrap"],
      description:
        "Comprehensive school management system with CBT, LMS, CMS, PPDB, and student database features",
      features: [
        "CBT",
        "LMS",
        "CMS",
        "PPDB",
        "Student Database",
        "Tahfiz Reports",
      ],
      link: "/edubyte",
    },
    {
      title: "faceUp - Facebook Clone",
      stack: ["React", "Redux", "Node.js", "MongoDB", "tailwindcss"],
      description: "Social media platform with real-time features",
      features: [
        "User Authentication",
        "Post Creation",
        "Real-time Updates",
        "Messaging",
      ],
      link: "/face-up",
    },
    {
      title: "Toserba - E-commerce Platform",
      stack: ["React", "Node.js", "PostgreSQL", "Payment Gateway"],
      description:
        "Full-featured e-commerce platform with payment integration and shipping calculation",
      features: [
        "Bank Payment Integration",
        "Automatic Shipping Calculation",
        "Product Management",
      ],
      link: "/toserba",
    },
    {
      title: "WAMATE - More than WhatsApp",
      stack: ["React", "Node.js", "PostgreSQL", "Whatsapp-web.js"],
      description:
        "WhatsApp clone with real-time messaging and bulk messaging features",
      features: [
        "User Authentication",
        "Real-time messaging",
        "Bulk messaging",
      ],
      link: "/wamate",
    },
  ];

  const handleClick = () => {
    toast.success("Coming Soon");
  };

  return (
    <div className='min-vh-100'>
      <Navbar />

      {/* Hero Section */}
      <section
        id='home'
        className='hero-section py-5 min-vh-100 d-flex align-items-center'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 text-center text-lg-start'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='display-4 fw-bold mb-4 text-primary'>
                  Full Stack Web Developer
                </h1>
                <p className='lead mb-4 text-primary-75'>
                  Specializing in React, Node.js, and modern web technologies.
                  Creating scalable and efficient web applications.
                </p>
                <div className='d-flex gap-3 justify-content-center justify-content-lg-start'>
                  <a href='#projects' className='btn btn-light btn-lg px-4'>
                    View Projects
                  </a>
                  <a
                    href='#contact'
                    className='btn btn-outline-primary btn-lg px-4'>
                    Contact Me
                  </a>
                </div>
              </motion.div>
            </div>
            <div className='col-lg-6 d-none d-lg-block'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}>
                <img
                  src='/hero.png'
                  alt='Developer Illustration'
                  className='img-fluid'
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id='about' className='about-section bg-light py-5'>
        <div className='container'>
          <h2 className='text-center mb-5'>Tech Stack</h2>
          <div className='row g-4'>
            <div className='col-md-6'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                <h3 className='mb-4'>Technical Skills</h3>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <div className='p-4 bg-white rounded-3 shadow-sm h-100 hover-card'>
                      <FaCode
                        className='text-primary mb-3'
                        style={{ fontSize: "2rem" }}
                      />
                      <h5>Frontend Development</h5>
                      <p className='text-muted mb-0'>React</p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='p-4 bg-white rounded-3 shadow-sm h-100 hover-card'>
                      <FaServer
                        className='text-primary mb-3'
                        style={{ fontSize: "2rem" }}
                      />
                      <h5>Backend Development</h5>
                      <p className='text-muted mb-0'>Node.js, Express.js</p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='p-4 bg-white rounded-3 shadow-sm h-100 hover-card'>
                      <FaDatabase
                        className='text-primary mb-3'
                        style={{ fontSize: "2rem" }}
                      />
                      <h5>Database Management</h5>
                      <p className='text-muted mb-0'>MongoDB, PostgreSQL</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className='col-md-6'>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                <h3 className='mb-4'>Tools & Technologies</h3>
                <div className='bg-white p-4 rounded-3 shadow-sm hover-card'>
                  <ul className='list-unstyled mb-0'>
                    <li className='mb-2'>
                      <i className='bi bi-check-circle-fill text-primary me-2'></i>
                      React.js & Redux
                    </li>
                    <li className='mb-2'>
                      <i className='bi bi-check-circle-fill text-primary me-2'></i>
                      Node.js & Express.js
                    </li>
                    <li className='mb-2'>
                      <i className='bi bi-check-circle-fill text-primary me-2'></i>
                      PostgreSQL & MongoDB
                    </li>
                    <li className='mb-2'>
                      <i className='bi bi-check-circle-fill text-primary me-2'></i>
                      Bootstrap & Tailwind CSS
                    </li>
                    <li className='mb-2'>
                      <i className='bi bi-check-circle-fill text-primary me-2'></i>
                      Ant Design & Material UI
                    </li>
                    <li className='mb-2'>
                      <i className='bi bi-check-circle-fill text-primary me-2'></i>
                      Linux Server Management
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id='projects' className='projects-section py-5'>
        <div className='container'>
          <h2 className='text-center mb-5'>My Projects</h2>
          <div className='row g-4'>
            {projects.map((project, index) => (
              <div className='col-md-4' key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}>
                  <div className='card h-100 shadow-sm border-0'>
                    <div className='card-body p-4'>
                      <h3 className='card-title h4 mb-3'>{project.title}</h3>
                      <p className='card-text text-muted mb-3'>
                        {project.description}
                      </p>
                      <div className='mb-3'>
                        {project.stack.map((tech, i) => (
                          <span
                            key={i}
                            className='badge bg-light text-primary me-1 mb-1'>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className='d-flex gap-2'>
                        <a
                          className='btn btn-outline-primary flex-grow-1'
                          onClick={handleClick}>
                          View Details
                        </a>
                        <button
                          className='btn btn-outline-secondary flex-grow-1'
                          onClick={handleClick}>
                          Source Code
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='contact-section bg-light py-5'>
        <div className='container'>
          <h2 className='text-center mb-5'>Get In Touch</h2>
          <div className='row g-4'>
            <div className='col-lg-6'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                <form className='bg-white p-4 rounded-3 shadow-sm'>
                  <div className='mb-3'>
                    <input
                      type='text'
                      className='form-control py-3'
                      placeholder='Your Name'
                    />
                  </div>
                  <div className='mb-3'>
                    <input
                      type='email'
                      className='form-control py-3'
                      placeholder='Your Email'
                    />
                  </div>
                  <div className='mb-3'>
                    <textarea
                      className='form-control py-3'
                      rows='5'
                      placeholder='Your Message'></textarea>
                  </div>
                  <button
                    type='button'
                    className='btn btn-primary btn-lg w-100'
                    onClick={handleClick}>
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
            <div className='col-lg-6'>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}>
                <div className='bg-white p-4 rounded-3 shadow-sm h-100'>
                  <h3 className='mb-4'>Connect With Me</h3>
                  <div className='d-flex flex-column gap-3'>
                    <a
                      href='https://www.linkedin.com/in/jadid-al-magribi'
                      className='text-decoration-none text-dark p-3 bg-light rounded-3 d-flex align-items-center gap-3 hover-card'>
                      <FaLinkedin
                        className='text-primary'
                        style={{ fontSize: "1.5rem" }}
                      />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href='https://wa.me/6287720776871'
                      className='text-decoration-none text-dark p-3 bg-light rounded-3 d-flex align-items-center gap-3 hover-card'>
                      <FaWhatsapp
                        className='text-primary'
                        style={{ fontSize: "1.5rem" }}
                      />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
