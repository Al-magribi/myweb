import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useGetLandingPageQuery } from "../../controller/api/admin/ApiCourse";

const Fswd = () => {
  const id = 1;
  const { data: course, isLoading, error } = useGetLandingPageQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Landing page error:", error);
    return (
      <div className="alert alert-danger text-center m-3">
        Error loading course data. Please try again later.
      </div>
    );
  }

  if (!course) {
    return (
      <div className="alert alert-warning text-center m-3">
        Course not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", marginTop: 60 }}>
        {/* Hero Section */}
        <section className="bg-dark text-white py-4 py-lg-5">
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-lg-6 order-2 order-lg-1">
                <div className="px-0 px-lg-3">
                  <span className="badge bg-primary mb-2 mb-lg-3">
                    {course.category} • {course.level}
                  </span>
                  <h1 className="display-5 fw-bold mb-2 mb-lg-3">
                    {course.title}
                  </h1>
                  <div
                    className="lead mb-3 mb-lg-4 fs-6"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                  <div className="d-flex flex-wrap gap-3 mb-3 mb-lg-4">
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i className="bi bi-clock text-primary"></i>
                      </div>
                      <span className="small">{course.duration} Jam</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i className="bi bi-person text-primary"></i>
                      </div>
                      <span className="small">{course.instructor}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <i className="bi bi-tag text-primary"></i>
                      </div>
                      <span className="small">
                        Rp {parseInt(course.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3">
                    <button className="btn btn-primary px-4 py-2">
                      Daftar Sekarang
                    </button>
                    <a
                      href={course.video_preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-light px-4 py-2"
                    >
                      <i className="bi bi-play-circle me-2"></i>
                      Preview
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <div className="position-relative">
                  <img
                    src={course?.thumbnail}
                    alt={course.title}
                    className="img-fluid rounded shadow-lg w-100"
                    style={{ objectFit: "cover", maxHeight: "400px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Objectives Section */}
        <section className="py-4 py-lg-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="display-6 fw-bold mb-3 mb-lg-4">
                  Yang Akan Kamu Pelajari
                </h2>
                <p className="lead text-muted mb-4 mb-lg-5 fs-6">
                  Kurikulum lengkap dan terstruktur untuk menjadi Full Stack
                  Developer
                </p>
              </div>
            </div>
            <div className="row g-3 g-lg-4">
              {course.objectives.map((objective, index) => (
                <div key={index} className="col-12 col-md-6">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{ width: "36px", height: "36px" }}
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    >
                      <i className="bi bi-check2-circle"></i>
                    </div>
                    <p className="m-0 small">{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-4 py-lg-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="display-6 fw-bold mb-3 mb-lg-4">
                  Persyaratan Kursus
                </h2>
                <p className="lead text-muted mb-4 mb-lg-5 fs-6">
                  Yang perlu kamu siapkan sebelum memulai
                </p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3 p-lg-4">
                    {course.requirements.map((requirement, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center gap-3 mb-3"
                      >
                        <div
                          style={{ width: "36px", height: "36px" }}
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        >
                          <i className="bi bi-check2-circle"></i>
                        </div>
                        <p className="mb-0 small">{requirement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-4 py-lg-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="display-6 fw-bold mb-3 mb-lg-4">
                  Teknologi yang Akan Kamu Kuasai
                </h2>
                <p className="lead text-muted mb-4 mb-lg-5 fs-6">
                  Stack teknologi modern untuk menjadi Full Stack Developer
                  profesional
                </p>
              </div>
            </div>
            <div className="row g-3 g-lg-4">
              {[
                { name: "React.js", icon: "react" },
                { name: "Redux", icon: "redux" },
                { name: "Node.js", icon: "nodejs" },
                { name: "MongoDB", icon: "mongodb" },
                { name: "PostgreSQL", icon: "postgresql" },
                { name: "Nginx", icon: "nginx" },
                { name: "Linux", icon: "linux" },
                { name: "GitHub", icon: "github" },
              ].map((tech, index) => (
                <div key={index} className="col-4 col-md-3">
                  <div className="card border-0 shadow-sm h-100 hover-scale">
                    <div className="card-body text-center p-2 p-lg-3">
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        className="mb-2 mb-lg-3"
                        style={{ width: "32px", height: "32px" }}
                      />
                      <h6 className="mb-0 small">{tech.name}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-4 py-lg-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center mb-5">
                <h2 className="display-6 fw-bold mb-3">
                  Mengapa Belajar di Kursus Ini?
                </h2>
                <p className="lead text-muted fs-6">
                  Kursus ini dirancang khusus untuk memastikan kesuksesan Anda
                  dalam dunia pengembangan web
                </p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        style={{ width: "48px", height: "48px" }}
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      >
                        <i className="bi bi-person-workspace fs-4"></i>
                      </div>
                      <h3 className="h5 mb-0">Belajar dari Praktisi</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Dibimbing langsung oleh developer profesional yang telah
                      berpengalaman di industri. Dapatkan wawasan nyata dan tips
                      praktis yang tidak akan Anda temukan di tempat lain.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        style={{ width: "48px", height: "48px" }}
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      >
                        <i className="bi bi-laptop fs-4"></i>
                      </div>
                      <h3 className="h5 mb-0">Project Based</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Bangun portfolio yang mengesankan dengan 15+ proyek nyata.
                      Dari aplikasi sederhana hingga sistem yang kompleks, Anda
                      akan memiliki bukti nyata kemampuan Anda.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div
                        style={{ width: "48px", height: "48px" }}
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      >
                        <i className="bi bi-rocket-takeoff fs-4"></i>
                      </div>
                      <h3 className="h5 mb-0">Siap Berkarir</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Kurikulum yang selalu diperbarui sesuai kebutuhan
                      industri. Anda akan menguasai teknologi yang paling dicari
                      oleh perusahaan teknologi saat ini.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-4 py-lg-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="display-6 fw-bold mb-4">
                  Mulai Perjalanan Anda Menuju
                  <br />
                  Karir Developer Profesional
                </h2>

                <div className="d-flex flex-column gap-4">
                  <div className="feature-item">
                    <div className="d-flex align-items-center mb-2">
                      <div
                        style={{ width: "36px", height: "36px" }}
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      >
                        <i className="bi bi-book"></i>
                      </div>
                      <p className="m-0 fw-bold">
                        Belajar dengan Sistem yang Terstruktur
                      </p>
                    </div>
                    <p className="text-muted ms-5 mb-0">
                      Materi disusun secara sistematis dari dasar hingga mahir,
                      memastikan Anda memahami setiap konsep dengan baik.
                    </p>
                  </div>

                  <div className="feature-item">
                    <div className="d-flex align-items-center mb-2">
                      <div
                        style={{ width: "36px", height: "36px" }}
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      >
                        <i className="bi bi-people"></i>
                      </div>
                      <p className="m-0 fw-bold">
                        Dukungan Pembelajaran Optimal
                      </p>
                    </div>
                    <p className="text-muted ms-5 mb-0">
                      Akses ke komunitas developer dan materi yang selalu
                      diperbarui untuk mengikuti perkembangan teknologi terbaru.
                    </p>
                  </div>

                  <div className="feature-item">
                    <div className="d-flex align-items-center mb-2">
                      <div
                        style={{ width: "36px", height: "36px" }}
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      >
                        <i className="bi bi-camera-video"></i>
                      </div>
                      <p className="m-0 fw-bold">
                        Konsultasi Personal via Zoom
                      </p>
                    </div>
                    <p className="text-muted ms-5 mb-0">
                      Sesi one-on-one dengan mentor melalui Zoom untuk membahas
                      kendala belajar, review code, dan konsultasi karir.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card border-0 shadow-lg">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <h3 className="h4 mb-3">Investasi untuk Masa Depan</h3>
                      <div className="d-flex justify-content-center gap-2 mb-3">
                        <span className="h3 mb-0">Rp</span>
                        <span className="display-4 fw-bold">
                          {parseInt(course.price).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-muted mb-0">Akses seumur hidup</p>
                    </div>
                    <ul className="list-unstyled mb-4">
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check2-circle text-primary me-2"></i>
                        <span>{course.duration}+ jam video pembelajaran</span>
                      </li>
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check2-circle text-primary me-2"></i>
                        <span>4x sesi konsultasi personal via Zoom</span>
                      </li>
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check2-circle text-primary me-2"></i>
                        <span>Akses grup komunitas private</span>
                      </li>
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check2-circle text-primary me-2"></i>
                        <span>Code review & feedback personal</span>
                      </li>
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check2-circle text-primary me-2"></i>
                        <span>Update materi seumur hidup</span>
                      </li>
                    </ul>
                    <button className="btn btn-primary w-100 py-3 fw-bold">
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-4 py-lg-5 bg-primary text-white">
          <div className="container text-center">
            <h2 className="display-6 fw-bold mb-3 mb-lg-4">
              Siap Memulai Perjalananmu?
            </h2>
            <p className="lead mb-3 mb-lg-4 fs-6">
              Bergabunglah dengan {course.enrollment_count}+ developer yang
              telah mengubah karir mereka melalui program ini.
            </p>
            <button className="btn btn-light px-4 py-2 hover-scale">
              Daftar Sekarang - Rp {parseInt(course.price).toLocaleString()}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Fswd;
