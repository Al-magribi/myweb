import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Fswd = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", marginTop: 80 }}>
        {/* Hero Section */}
        <section className='bg-dark text-white py-5'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-6'>
                <h1 className='display-4 fw-bold mb-4'>
                  JavaScript Full Stack Web Developer
                </h1>
                <p className='lead mb-4'>
                  Pelajari cara membangun aplikasi web modern dari frontend
                  hingga backend. Kursus JavaScript Full Stack pertama dalam
                  Bahasa Indonesia yang akan membawamu dari pemula hingga
                  profesional!
                </p>
                <div className='d-flex gap-3'>
                  <button className='btn btn-primary btn-lg px-4'>
                    Daftar Sekarang
                  </button>
                  <button className='btn btn-outline-light btn-lg px-4'>
                    Lihat Kurikulum
                  </button>
                </div>
              </div>
              <div className='col-lg-6'>
                <img
                  src='https://res.cloudinary.com/dmsxwwfb5/image/upload/v1595866967/full-stack-devlopment-min.png'
                  alt='Full Stack Development'
                  className='img-fluid rounded shadow'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Career Path Section */}
        <section className='py-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-6 fw-bold mb-4'>
                  Jalur Pembelajaran Full Stack
                </h2>
                <p className='lead text-muted mb-5'>
                  Pelajari keterampilan yang dibutuhkan untuk menjadi Full Stack
                  Developer profesional
                </p>
              </div>
            </div>
            <div className='row g-4'>
              <div className='col-md-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        style={{ height: 40, width: 40 }}
                        className='bg-primary flex-center text-white rounded-circle p-3 me-3'>
                        <i className='bi bi-1-circle-fill'></i>
                      </div>
                      <h3 className='h5 mb-0'>Frontend Development</h3>
                    </div>
                    <ul className='list-unstyled'>
                      <li className='mb-2'>✓ HTML5 & CSS3 Modern</li>
                      <li className='mb-2'>✓ JavaScript ES6+</li>
                      <li className='mb-2'>✓ React.js & Next.js</li>
                      <li className='mb-2'>✓ Redux & Context API</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        style={{ height: 40, width: 40 }}
                        className='bg-primary flex-center text-white rounded-circle p-3 me-3'>
                        <i className='bi bi-2-circle-fill'></i>
                      </div>
                      <h3 className='h5 mb-0'>Backend Development</h3>
                    </div>
                    <ul className='list-unstyled'>
                      <li className='mb-2'>✓ Node.js & Express.js</li>
                      <li className='mb-2'>✓ MongoDB & PostgreSQL</li>
                      <li className='mb-2'>✓ RESTful API Design</li>
                      <li className='mb-2'>✓ Authentication & Security</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        style={{ height: 40, width: 40 }}
                        className='bg-primary flex-center text-white rounded-circle p-3 me-3'>
                        <i className='bi bi-3-circle-fill'></i>
                      </div>
                      <h3 className='h5 mb-0'>Project & Deployment</h3>
                    </div>
                    <ul className='list-unstyled'>
                      <li className='mb-2'>✓ Full Stack Projects</li>
                      <li className='mb-2'>✓ CI/CD Pipeline</li>
                      <li className='mb-2'>✓ Cloud Deployment</li>
                      <li className='mb-2'>✓ Portfolio Building</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Stats Section */}
        <section className='py-5 bg-light'>
          <div className='container'>
            <div className='row text-center g-4'>
              <div className='col-md-3'>
                <div className='card border-0 bg-white shadow-sm'>
                  <div className='card-body'>
                    <h2 className='display-4 fw-bold text-primary'>50+</h2>
                    <p className='text-muted'>Jam Pembelajaran</p>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 bg-white shadow-sm'>
                  <div className='card-body'>
                    <h2 className='display-4 fw-bold text-primary'>15+</h2>
                    <p className='text-muted'>Proyek Praktis</p>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 bg-white shadow-sm'>
                  <div className='card-body'>
                    <h2 className='display-4 fw-bold text-primary'>100%</h2>
                    <p className='text-muted'>Project Based</p>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 bg-white shadow-sm'>
                  <div className='card-body'>
                    <h2 className='display-4 fw-bold text-primary'>4.9</h2>
                    <p className='text-muted'>Rating Kursus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className='py-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-6 fw-bold mb-4'>
                  Teknologi yang Akan Kamu Kuasai
                </h2>
                <p className='lead text-muted mb-5'>
                  Stack teknologi modern untuk menjadi Full Stack Developer
                  profesional
                </p>
              </div>
            </div>
            <div className='row g-4'>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
                      alt='React'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>React.js</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg'
                      alt='Redux'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>Redux</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
                      alt='Node.js'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>Node.js</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
                      alt='MongoDB'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>MongoDB</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
                      alt='PostgreSQL'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>PostgreSQL</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg'
                      alt='Nginx'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>Nginx</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'
                      alt='Linux'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>Linux & Cron</h5>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 shadow-sm h-100'>
                  <div className='card-body text-center'>
                    <img
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
                      alt='GitHub'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>GitHub</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-12 text-center'>
                <div className='card border-0 shadow-sm'>
                  <div className='card-body'>
                    <h5 className='mb-0'>
                      Dan masih banyak lagi termasuk aapanel, deployment, dan
                      tools development lainnya!
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-5 bg-primary text-white'>
          <div className='container text-center'>
            <h2 className='display-6 fw-bold mb-4'>
              Siap Memulai Perjalananmu?
            </h2>
            <p className='lead mb-4'>
              Bergabunglah dengan ribuan developer sukses yang telah mengubah
              karir mereka melalui program ini.
            </p>
            <button className='btn btn-light btn-lg px-5'>
              Daftar Sekarang
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Fswd;
