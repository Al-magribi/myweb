import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Ecom = () => {
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
                  Build E-commerce dengan MERN Stack
                </h1>
                <p className='lead mb-4'>
                  Pelajari cara membangun e-commerce modern dengan integrasi
                  pembayaran, pengiriman, dan chat real-time. Mulai karirmu
                  sebagai Full Stack Developer sekarang!
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
                  src='https://idwebhost.com/blog/wp-content/uploads/2025/01/mern-a-1.webp'
                  alt='E-commerce Development'
                  className='img-fluid rounded shadow'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-6 fw-bold mb-4'>
                  Apa yang Akan Kamu Bangun?
                </h2>
                <p className='lead text-muted mb-5'>
                  E-commerce modern dengan fitur lengkap dan teknologi terkini
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
                      <h3 className='h5 mb-0'>Frontend Modern</h3>
                    </div>
                    <ul className='list-unstyled'>
                      <li className='mb-2'>✓ React.js & Redux</li>
                      <li className='mb-2'>✓ Responsive Design</li>
                      <li className='mb-2'>✓ User Dashboard</li>
                      <li className='mb-2'>✓ Admin Panel</li>
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
                      <h3 className='h5 mb-0'>Backend & Database</h3>
                    </div>
                    <ul className='list-unstyled'>
                      <li className='mb-2'>✓ Node.js & Express</li>
                      <li className='mb-2'>✓ MongoDB & Mongoose</li>
                      <li className='mb-2'>✓ RESTful API</li>
                      <li className='mb-2'>✓ JWT Authentication</li>
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
                      <h3 className='h5 mb-0'>Integrasi & Fitur</h3>
                    </div>
                    <ul className='list-unstyled'>
                      <li className='mb-2'>✓ Midtrans Payment</li>
                      <li className='mb-2'>✓ Raja Ongkir API</li>
                      <li className='mb-2'>✓ Real-time Chat</li>
                      <li className='mb-2'>✓ Cloud Deployment</li>
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
                    <h2 className='display-4 fw-bold text-primary'>30+</h2>
                    <p className='text-muted'>Jam Pembelajaran</p>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='card border-0 bg-white shadow-sm'>
                  <div className='card-body'>
                    <h2 className='display-4 fw-bold text-primary'>10+</h2>
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
                    <h2 className='display-4 fw-bold text-primary'>4.8</h2>
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
                  Teknologi yang Digunakan
                </h2>
                <p className='lead text-muted mb-5'>
                  Stack teknologi modern untuk membangun e-commerce profesional
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
                      src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
                      alt='Express'
                      className='mb-3'
                      style={{ width: "48px" }}
                    />
                    <h5>Express.js</h5>
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
              Siap Membangun E-commerce Pertamamu?
            </h2>
            <p className='lead mb-4'>
              Bergabunglah dengan ribuan developer sukses yang telah membangun
              e-commerce mereka melalui program ini.
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

export default Ecom;
