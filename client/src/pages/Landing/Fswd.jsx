import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useGetLandingPageQuery } from "../../controller/api/admin/ApiCourse";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";

const Fswd = () => {
  const id = 1;
  const { data: course, isLoading, error } = useGetLandingPageQuery(id);

  const prices = [
    { amount: 560000, label: "Batch 1" },
    { amount: 1560000, label: "Batch 2" },
    { amount: 2560000, label: "Batch 3+" },
  ];

  const remainingSlots = Math.floor(Math.random() * 5) + 3;

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-danger text-center m-3'>
        Error loading course data. Please try again later.
      </div>
    );
  }

  if (!course) {
    return (
      <div className='alert alert-warning text-center m-3'>
        Course not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", marginTop: 60 }}>
        {/* Hero Section */}
        <section className='bg-dark text-white py-4 py-lg-5'>
          <div className='container'>
            <div className='row align-items-center gy-4'>
              <div className='col-lg-6 order-2 order-lg-1'>
                <div className='px-0 px-lg-3'>
                  {/* Urgency Banner */}
                  <div className='alert alert-danger mb-3'>
                    <i className='bi bi-exclamation-triangle-fill me-2'></i>
                    <strong>PERHATIAN:</strong> Kesempatan batch 1 dengan harga
                    terendah akan segera berakhir!
                  </div>

                  <span className='badge bg-primary mb-2 mb-lg-3'>
                    {course.category} • {course.level}
                  </span>

                  <h1 className='display-5 fw-bold mb-2 mb-lg-3'>
                    Kuasai Full Stack Web Development dalam 3 Bulan
                  </h1>

                  <div className='lead mb-3 mb-lg-4'>
                    <p className='mb-2'>
                      <i className='bi bi-rocket-takeoff me-2'></i>
                      Dari pemula menjadi developer profesional dengan gaji
                      kompetitif
                    </p>
                    <p className='mb-2'>
                      <i className='bi bi-person-workspace me-2'></i>
                      Dibimbing langsung oleh praktisi berpengalaman dari
                      perusahaan ternama
                    </p>
                    <p className='mb-2'>
                      <i className='bi bi-shield-check me-2'></i>
                      Garansi kerja atau uang kembali 100%*
                    </p>
                  </div>

                  {/* Social Proof */}
                  <div className='d-flex flex-wrap gap-3 mb-4'>
                    <div className='bg-dark bg-opacity-50 p-2 rounded'>
                      <div className='text-warning mb-1'>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                      </div>
                      <small className='text-white-50'>
                        Rated 4.9/5 dari 1000+ alumni
                      </small>
                    </div>
                    <div className='bg-dark bg-opacity-50 p-2 rounded'>
                      <div className='text-primary mb-1'>
                        <i className='bi bi-patch-check-fill'></i>
                      </div>
                      <small className='text-white-50'>
                        90% alumni bekerja dalam 3 bulan
                      </small>
                    </div>
                  </div>

                  <div className='d-flex flex-wrap gap-3'>
                    <button className='btn btn-primary px-4 py-2'>
                      <i className='bi bi-rocket-takeoff-fill me-2'></i>
                      Daftar Sekarang
                    </button>
                    <a
                      href={course.video_preview}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn btn-outline-light px-4 py-2'
                    >
                      <i className='bi bi-play-circle me-2'></i>
                      Preview Kelas
                    </a>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 order-1 order-lg-2'>
                <div className='position-relative'>
                  <img
                    src={course?.thumbnail}
                    alt={course.title}
                    className='img-fluid rounded shadow-lg w-100'
                    style={{ objectFit: "cover", maxHeight: "400px" }}
                  />
                  {/* Overlay Badge */}
                  <div
                    className='position-absolute top-0 end-0 bg-danger text-white p-3 rounded-circle m-3'
                    style={{ transform: "rotate(15deg)" }}
                  >
                    <div className='text-center'>
                      <div className='fw-bold'>Sisa</div>
                      <div className='display-6 fw-bold'>{remainingSlots}</div>
                      <div className='small'>slot</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fear Section */}
        <section className='bg-danger text-white py-5'>
          <div className='container'>
            <h2 className='text-center mb-4'>
              ⚠️ Jangan Tunggu Sampai Terlambat!
            </h2>
            <div className='row g-4'>
              <div className='col-md-4'>
                <div className='d-flex align-items-start'>
                  <i className='bi bi-x-circle-fill fs-1 me-3 text-warning'></i>
                  <div>
                    <h5>Kompetisi Semakin Ketat</h5>
                    <p className='mb-0'>
                      Ribuan developer baru masuk ke industri setiap bulannya.
                      Posisi junior semakin sulit didapat.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex align-items-start'>
                  <i className='bi bi-x-circle-fill fs-1 me-3 text-warning'></i>
                  <div>
                    <h5>AI Mengancam Pekerjaan</h5>
                    <p className='mb-0'>
                      Teknologi AI berkembang pesat. Developer yang tidak
                      upgrade skill berisiko tergantikan.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex align-items-start'>
                  <i className='bi bi-x-circle-fill fs-1 me-3 text-warning'></i>
                  <div>
                    <h5>Harga Akan Naik</h5>
                    <p className='mb-0'>
                      Setelah batch 1 selesai, harga akan naik signifikan.
                      Jangan sia-siakan harga promo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Objectives Section */}
        <section className='py-4 py-lg-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-6 fw-bold mb-3 mb-lg-4'>
                  Yang Akan Kamu Pelajari
                </h2>
                <p className='lead text-muted mb-4 mb-lg-5 fs-6'>
                  Kurikulum lengkap dan terstruktur untuk menjadi Full Stack
                  Developer
                </p>
              </div>
            </div>
            <div className='row g-3 g-lg-4'>
              {course.objectives.map((objective, index) => (
                <div key={index} className='col-12 col-md-6'>
                  <div className='d-flex align-items-center gap-3'>
                    <div
                      style={{ width: "36px", height: "36px" }}
                      className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0'
                    >
                      <i className='bi bi-check2-circle'></i>
                    </div>
                    <p className='m-0 small'>{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className='py-4 py-lg-5 bg-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-6 fw-bold mb-3 mb-lg-4'>
                  Persyaratan Kursus
                </h2>
                <p className='lead text-muted mb-4 mb-lg-5 fs-6'>
                  Yang perlu kamu siapkan sebelum memulai
                </p>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-lg-8'>
                <div className='card border-0 shadow-sm'>
                  <div className='card-body p-3 p-lg-4'>
                    {course.requirements.map((requirement, index) => (
                      <div
                        key={index}
                        className='d-flex align-items-center gap-3 mb-3'
                      >
                        <div
                          style={{ width: "36px", height: "36px" }}
                          className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0'
                        >
                          <i className='bi bi-check2-circle'></i>
                        </div>
                        <p className='mb-0 small'>{requirement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className='py-4 py-lg-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-6 fw-bold mb-3 mb-lg-4'>
                  Teknologi yang Akan Kamu Kuasai
                </h2>
                <p className='lead text-muted mb-4 mb-lg-5 fs-6'>
                  Stack teknologi modern untuk menjadi Full Stack Developer
                  profesional
                </p>
              </div>
            </div>
            <div className='row g-3 g-lg-4'>
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
                <div key={index} className='col-4 col-md-3'>
                  <div className='card border-0 shadow-sm h-100 hover-scale'>
                    <div className='card-body text-center p-2 p-lg-3'>
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        className='mb-2 mb-lg-3'
                        style={{ width: "32px", height: "32px" }}
                      />
                      <h6 className='mb-0 small'>{tech.name}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='py-4 py-lg-5 bg-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center mb-5'>
                <h2 className='display-6 fw-bold mb-3'>
                  Mengapa Belajar di Kursus Ini?
                </h2>
                <p className='lead text-muted fs-6'>
                  Kursus ini dirancang khusus untuk memastikan kesuksesan Anda
                  dalam dunia pengembangan web
                </p>
              </div>
            </div>
            <div className='row g-4'>
              <div className='col-md-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body p-4'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        style={{ width: "48px", height: "48px" }}
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                      >
                        <i className='bi bi-person-workspace fs-4'></i>
                      </div>
                      <h3 className='h5 mb-0'>Belajar dari Praktisi</h3>
                    </div>
                    <p className='text-muted mb-0'>
                      Dibimbing langsung oleh developer profesional yang telah
                      berpengalaman di industri. Dapatkan wawasan nyata dan tips
                      praktis yang tidak akan Anda temukan di tempat lain.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body p-4'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        style={{ width: "48px", height: "48px" }}
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                      >
                        <i className='bi bi-laptop fs-4'></i>
                      </div>
                      <h3 className='h5 mb-0'>Project Based</h3>
                    </div>
                    <p className='text-muted mb-0'>
                      Bangun portfolio yang mengesankan dengan 15+ proyek nyata.
                      Dari aplikasi sederhana hingga sistem yang kompleks, Anda
                      akan memiliki bukti nyata kemampuan Anda.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body p-4'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        style={{ width: "48px", height: "48px" }}
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                      >
                        <i className='bi bi-rocket-takeoff fs-4'></i>
                      </div>
                      <h3 className='h5 mb-0'>Siap Berkarir</h3>
                    </div>
                    <p className='text-muted mb-0'>
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
        <section className='py-4 py-lg-5'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-6'>
                <h2 className='display-6 fw-bold mb-4'>
                  Mulai Perjalanan Anda Menuju
                  <br />
                  Karir Developer Profesional
                </h2>

                <div className='d-flex flex-column gap-4'>
                  <div className='feature-item'>
                    <div className='d-flex align-items-center mb-2'>
                      <div
                        style={{ width: "36px", height: "36px" }}
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3'
                      >
                        <i className='bi bi-book'></i>
                      </div>
                      <p className='m-0 fw-bold'>
                        Belajar dengan Sistem yang Terstruktur
                      </p>
                    </div>
                    <p className='text-muted ms-5 mb-0'>
                      Materi disusun secara sistematis dari dasar hingga mahir,
                      memastikan Anda memahami setiap konsep dengan baik.
                    </p>
                  </div>

                  <div className='feature-item'>
                    <div className='d-flex align-items-center mb-2'>
                      <div
                        style={{ width: "36px", height: "36px" }}
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3'
                      >
                        <i className='bi bi-people'></i>
                      </div>
                      <p className='m-0 fw-bold'>
                        Dukungan Pembelajaran Optimal
                      </p>
                    </div>
                    <p className='text-muted ms-5 mb-0'>
                      Akses ke komunitas developer dan materi yang selalu
                      diperbarui untuk mengikuti perkembangan teknologi terbaru.
                    </p>
                  </div>

                  <div className='feature-item'>
                    <div className='d-flex align-items-center mb-2'>
                      <div
                        style={{ width: "36px", height: "36px" }}
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3'
                      >
                        <i className='bi bi-camera-video'></i>
                      </div>
                      <p className='m-0 fw-bold'>
                        Konsultasi Personal via Zoom
                      </p>
                    </div>
                    <p className='text-muted ms-5 mb-0'>
                      Sesi one-on-one dengan mentor melalui Zoom untuk membahas
                      kendala belajar, review code, dan konsultasi karir.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='card border-0 shadow-lg'>
                  <div className='card-body p-4'>
                    <div className='text-center mb-4'>
                      <h3 className='h4 mb-3'>Investasi untuk Masa Depan</h3>
                      <div className='d-flex justify-content-center gap-2 mb-3'>
                        <span className='h3 mb-0'>Rp</span>
                        <span className='display-4 fw-bold'>
                          {parseInt(course.price).toLocaleString()}
                        </span>
                      </div>
                      <p className='text-muted mb-0'>Akses seumur hidup</p>
                    </div>
                    <ul className='list-unstyled mb-4'>
                      <li className='d-flex align-items-center mb-3'>
                        <i className='bi bi-check2-circle text-primary me-2'></i>
                        <span>{course.duration}+ jam video pembelajaran</span>
                      </li>
                      <li className='d-flex align-items-center mb-3'>
                        <i className='bi bi-check2-circle text-primary me-2'></i>
                        <span>4x sesi konsultasi personal via Zoom</span>
                      </li>
                      <li className='d-flex align-items-center mb-3'>
                        <i className='bi bi-check2-circle text-primary me-2'></i>
                        <span>Akses grup komunitas private</span>
                      </li>
                      <li className='d-flex align-items-center mb-3'>
                        <i className='bi bi-check2-circle text-primary me-2'></i>
                        <span>Code review & feedback personal</span>
                      </li>
                      <li className='d-flex align-items-center mb-3'>
                        <i className='bi bi-check2-circle text-primary me-2'></i>
                        <span>Update materi seumur hidup</span>
                      </li>
                    </ul>
                    <button className='btn btn-primary w-100 py-3 fw-bold'>
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with Pricing */}
        <section className='py-4 py-lg-5 bg-primary text-white'>
          <div className='container text-center'>
            <h2 className='display-6 fw-bold mb-4'>
              Siap Memulai Perjalananmu?
            </h2>
            <p className='lead mb-4 fs-6'>
              Bergabunglah dengan {course.enrollment_count}+ developer yang
              telah mengubah karir mereka melalui program ini.
            </p>

            <div className='row justify-content-center'>
              <div className='col-lg-8'>
                <div className='bg-dark p-4 rounded-4 mb-4'>
                  <div className='text-center mb-4'>
                    <h3 className='text-warning mb-2'>
                      🔥 Flash Sale Batch 1 🔥
                    </h3>
                    <p className='text-white-50'>
                      Harga akan naik setelah kuota terpenuhi
                    </p>
                  </div>

                  <CountdownTimer />

                  <div className='price-tiers mt-4'>
                    {prices.map((price, index) => (
                      <div
                        key={index}
                        className='d-flex justify-content-between align-items-center p-3 rounded mb-2'
                        style={{
                          backgroundColor: index === 0 ? "#198754" : "#e9ecef",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div className='d-flex align-items-center'>
                          {index === 0 && (
                            <span
                              className='badge bg-white text-dark me-2 px-2 py-1'
                              style={{ fontSize: "0.8rem" }}
                            >
                              <i className='bi bi-check-circle-fill me-1'></i>
                              Active
                            </span>
                          )}
                          <span
                            className={index === 0 ? "text-white" : "text-dark"}
                            style={{
                              fontSize: "0.95rem",
                              fontWeight: index === 0 ? "600" : "400",
                            }}
                          >
                            {price.label}
                          </span>
                        </div>
                        <div
                          className={`fw-bold ${
                            index === 0 ? "text-white" : "text-dark"
                          }`}
                        >
                          Rp {price.amount.toLocaleString("id-ID")}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='mt-4 bg-dark-subtle p-3 rounded'>
                    <h5 className='text-warning mb-3'>Yang Kamu Dapatkan:</h5>
                    <ul className='list-unstyled mb-0'>
                      <li className='d-flex align-items-center mb-2'>
                        <i className='bi bi-check-circle-fill text-success me-2'></i>
                        <span>Akses kelas seumur hidup</span>
                      </li>
                      <li className='d-flex align-items-center mb-2'>
                        <i className='bi bi-check-circle-fill text-success me-2'></i>
                        <span>4x sesi konsultasi pribadi</span>
                      </li>
                      <li className='d-flex align-items-center mb-2'>
                        <i className='bi bi-check-circle-fill text-success me-2'></i>
                        <span>Sertifikat resmi</span>
                      </li>
                      <li className='d-flex align-items-center'>
                        <i className='bi bi-check-circle-fill text-success me-2'></i>
                        <span>Garansi kerja*</span>
                      </li>
                    </ul>
                  </div>

                  <div className='text-center mt-4'>
                    <button className='btn btn-warning btn-lg px-5 py-3 fw-bold'>
                      <i className='bi bi-lock-fill me-2'></i>
                      Daftar Batch 1 - Rp{" "}
                      {prices[0].amount.toLocaleString("id-ID")}
                    </button>
                    <p className='text-warning small mt-2'>
                      <i className='bi bi-clock-fill me-1'></i>
                      Tersisa {remainingSlots} slot lagi!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Fswd;
