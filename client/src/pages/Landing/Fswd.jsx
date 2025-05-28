import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useGetLandingPageQuery } from "../../controller/api/admin/ApiCourse";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import SEO from "../../components/SEO/SEO";
import Form from "../../components/MetaPixel/Form";

const Fswd = () => {
  const id = 1;
  const { data: course, isLoading, error } = useGetLandingPageQuery(id);

  const prices = [
    { amount: course?.price, label: "Batch 1" },
    { amount: 1560000, label: "Batch 2" },
    { amount: 2560000, label: "Batch 3+" },
  ];

  const remainingSlots = Math.floor(Math.random() * 8) + 3;

  if (isLoading) {
    return (
      <div className='min-vh-100 d-flex align-items-center justify-content-center'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-danger text-center mx-3 my-4'>
        Error loading course data. Please try again later.
      </div>
    );
  }

  if (!course) {
    return (
      <div className='alert alert-warning text-center mx-3 my-4'>
        Course not found.
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Full Stack Web Development Course",
    description:
      "Kuasai Full Stack Web Development dalam 80+ jam. Dari pemula menjadi developer profesional dengan gaji kompetitif.",
    provider: {
      "@type": "Organization",
      name: "ALMADEV",
      sameAs: ["https://jadidalmagribi.com"],
    },
    offers: {
      "@type": "Offer",
      price: prices[0].amount,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
    coursePrerequisites: course.requirements.join(", "),
    educationalCredentialAwarded: "Full Stack Web Development Certificate",
    timeRequired: `PT${course.duration}H`,
    numberOfCredits: "80",
    occupationalCredentialAwarded:
      "Professional Full Stack Developer Certificate",
    teaches: course.objectives.join(", "),
  };

  return (
    <>
      <SEO
        title='Full Stack Web Development Course | ALMADEV'
        description='Kuasai Full Stack Web Development dalam 80+ jam. Dari pemula menjadi developer profesional dengan gaji kompetitif. Dibimbing langsung oleh praktisi berpengalaman dari perusahaan ternama.'
        keywords='full stack development, web development course, react, node.js, mongodb, javascript, programming course, coding bootcamp, developer training'
        ogTitle='Full Stack Web Development Course - ALMADEV'
        ogDescription='Transform your career with our comprehensive Full Stack Web Development course. Learn from industry experts and build real-world projects.'
        ogImage={course?.thumbnail}
        structuredData={structuredData}
      />
      <Navbar />
      <main className='min-vh-100 mt-5'>
        {/* Hero Section */}
        <section className='bg-dark text-white py-5'>
          <div className='container'>
            <div className='alert alert-danger mb-4'>
              <div className='d-flex align-items-center'>
                <i className='bi bi-exclamation-triangle-fill fs-4 me-3'></i>
                <div>
                  <strong className='d-block mb-1'>PERHATIAN:</strong>
                  Kesempatan batch 1 dengan harga terendah akan segera berakhir!
                </div>
              </div>
            </div>
            <div className='row align-items-center gy-5'>
              <div className='col-lg-6 order-2 order-lg-1'>
                <div className='pe-lg-4'>
                  <span className='badge bg-primary rounded-pill px-3 py-2 mb-3 fs-6'>
                    {course.category} • {course.level}
                  </span>

                  <h1 className='display-4 fw-bold mb-4 lh-sm'>
                    Kuasai Full Stack Web Development dalam 80+ Jam
                  </h1>

                  <div className='lead mb-4'>
                    <div className='d-flex align-items-center mb-3'>
                      <i className='bi bi-rocket-takeoff fs-4 me-3 text-primary'></i>
                      <p className='m-0'>
                        Dari pemula menjadi developer profesional dengan gaji
                        kompetitif
                      </p>
                    </div>
                    <div className='d-flex align-items-center mb-3'>
                      <i className='bi bi-person-workspace fs-4 me-3 text-primary'></i>
                      <p className='m-0'>
                        Dibimbing langsung oleh praktisi berpengalaman dari
                        perusahaan ternama
                      </p>
                    </div>
                    <div className='d-flex align-items-center'>
                      <i className='bi bi-shield-check fs-4 me-3 text-primary'></i>
                      <p className='m-0'>Garansi 7 hari uang kembali 100%*</p>
                    </div>
                  </div>

                  {/* Social Proof */}
                  <div className='d-flex flex-wrap gap-3 mb-4'>
                    <div className='bg-white bg-opacity-10 p-3 rounded-3'>
                      <div className='text-warning mb-2'>
                        <i className='bi bi-star-fill me-1'></i>
                        <i className='bi bi-star-fill me-1'></i>
                        <i className='bi bi-star-fill me-1'></i>
                        <i className='bi bi-star-fill me-1'></i>
                        <i className='bi bi-star-fill'></i>
                      </div>
                      <small className='text-white-50'>
                        Rated 4.9/5 dari 1000+ alumni
                      </small>
                    </div>
                  </div>

                  <div className='d-flex flex-wrap gap-3'>
                    <button className='btn btn-primary btn-lg px-4'>
                      <i className='bi bi-rocket-takeoff-fill me-2'></i>
                      Daftar Sekarang
                    </button>
                    <a
                      href={course.video_preview}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn btn-outline-light btn-lg px-4'
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
                    className='img-fluid rounded-4 shadow-lg w-100'
                    style={{ objectFit: "cover", maxHeight: "450px" }}
                  />
                  {/* Overlay Badge */}
                  <div
                    className='position-absolute top-0 end-0 bg-danger text-white p-4 rounded-circle m-4 shadow-lg'
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
            <h2 className='text-center h1 mb-5'>
              ⚠️ Jangan Tunggu Sampai Terlambat!
            </h2>
            <div className='row g-4'>
              <div className='col-md-4'>
                <div className='d-flex align-items-start h-100'>
                  <i className='bi bi-x-circle-fill fs-1 me-3 text-warning'></i>
                  <div>
                    <h5 className='fw-bold mb-3'>Kompetisi Semakin Ketat</h5>
                    <p className='mb-0 lead fs-6'>
                      Ribuan developer baru masuk ke industri setiap bulannya.
                      Posisi junior semakin sulit didapat.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex align-items-start h-100'>
                  <i className='bi bi-x-circle-fill fs-1 me-3 text-warning'></i>
                  <div>
                    <h5 className='fw-bold mb-3'>AI Mengancam Pekerjaan</h5>
                    <p className='mb-0 lead fs-6'>
                      Teknologi AI berkembang pesat. Developer yang tidak
                      upgrade skill berisiko tergantikan.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='d-flex align-items-start h-100'>
                  <i className='bi bi-x-circle-fill fs-1 me-3 text-warning'></i>
                  <div>
                    <h5 className='fw-bold mb-3'>Harga Akan Naik</h5>
                    <p className='mb-0 lead fs-6'>
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
        <section className='py-5 bg-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-5 fw-bold mb-4'>
                  Yang Akan Kamu Pelajari
                </h2>
                <p className='lead text-muted mb-5'>
                  Kurikulum lengkap dan terstruktur untuk menjadi Full Stack
                  Developer
                </p>
              </div>
            </div>
            <div className='row g-4'>
              {course.objectives.map((objective, index) => (
                <div key={index} className='col-md-6'>
                  <div className='d-flex align-items-center gap-3 bg-white p-3 rounded-3 shadow-sm h-100'>
                    <div
                      className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0'
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className='bi bi-check2-circle'></i>
                    </div>
                    <p className='m-0 fs-6'>{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className='py-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-5 fw-bold mb-4'>Persyaratan Kursus</h2>
                <p className='lead text-muted mb-5'>
                  Yang perlu kamu siapkan sebelum memulai
                </p>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-lg-8'>
                <div className='card border-0 shadow-sm'>
                  <div className='card-body p-4 p-lg-5'>
                    {course.requirements.map((requirement, index) => (
                      <div
                        key={index}
                        className='d-flex align-items-center gap-3 mb-4 last:mb-0'
                      >
                        <div
                          className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0'
                          style={{ width: "40px", height: "40px" }}
                        >
                          <i className='bi bi-check2-circle'></i>
                        </div>
                        <p className='mb-0 fs-6'>{requirement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className='py-5 bg-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center'>
                <h2 className='display-5 fw-bold mb-4'>
                  Teknologi yang Akan Kamu Kuasai
                </h2>
                <p className='lead text-muted mb-5'>
                  Stack teknologi modern untuk menjadi Full Stack Developer
                  profesional
                </p>
              </div>
            </div>
            <div className='row g-4'>
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
                <div key={index} className='col-6 col-md-3'>
                  <div className='card border-0 shadow-sm h-100 transition-all hover-scale'>
                    <div className='card-body p-4 text-center'>
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        className='mb-3'
                        style={{ width: "48px", height: "48px" }}
                      />
                      <h6 className='mb-0 fw-bold'>{tech.name}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='py-5'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-8 mx-auto text-center mb-5'>
                <h2 className='display-5 fw-bold mb-4'>
                  Mengapa Belajar di Kursus Ini?
                </h2>
                <p className='lead text-muted'>
                  Kursus ini dirancang khusus untuk memastikan kesuksesan Anda
                  dalam dunia pengembangan web
                </p>
              </div>
            </div>
            <div className='row g-4'>
              <div className='col-md-4'>
                <div className='card h-100 border-0 shadow-sm'>
                  <div className='card-body p-4 p-lg-5'>
                    <div className='d-flex align-items-center mb-4'>
                      <div
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                        style={{ width: "56px", height: "56px" }}
                      >
                        <i className='bi bi-person-workspace fs-4'></i>
                      </div>
                      <h3 className='h4 mb-0'>Belajar dari Praktisi</h3>
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
                  <div className='card-body p-4 p-lg-5'>
                    <div className='d-flex align-items-center mb-4'>
                      <div
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                        style={{ width: "56px", height: "56px" }}
                      >
                        <i className='bi bi-laptop fs-4'></i>
                      </div>
                      <h3 className='h4 mb-0'>Project Based</h3>
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
                  <div className='card-body p-4 p-lg-5'>
                    <div className='d-flex align-items-center mb-4'>
                      <div
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3'
                        style={{ width: "56px", height: "56px" }}
                      >
                        <i className='bi bi-rocket-takeoff fs-4'></i>
                      </div>
                      <h3 className='h4 mb-0'>Siap Berkarir</h3>
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
        <section className='py-5 bg-light'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-6'>
                <h2 className='display-5 fw-bold mb-5'>
                  Mulai Perjalanan Anda Menuju
                  <br />
                  Karir Developer Profesional
                </h2>

                <div className='d-flex flex-column gap-4'>
                  <div className='feature-item'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3'
                        style={{ width: "48px", height: "48px" }}
                      >
                        <i className='bi bi-book fs-4'></i>
                      </div>
                      <p className='h5 m-0 fw-bold'>
                        Belajar dengan Sistem yang Terstruktur
                      </p>
                    </div>
                    <p className='text-muted ms-5 mb-0 lead fs-6'>
                      Materi disusun secara sistematis dari dasar hingga mahir,
                      memastikan Anda memahami setiap konsep dengan baik.
                    </p>
                  </div>

                  <div className='feature-item'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3'
                        style={{ width: "48px", height: "48px" }}
                      >
                        <i className='bi bi-people fs-4'></i>
                      </div>
                      <p className='h5 m-0 fw-bold'>
                        Dukungan Pembelajaran Optimal
                      </p>
                    </div>
                    <p className='text-muted ms-5 mb-0 lead fs-6'>
                      Akses ke komunitas developer dan materi yang selalu
                      diperbarui untuk mengikuti perkembangan teknologi terbaru.
                    </p>
                  </div>

                  <div className='feature-item'>
                    <div className='d-flex align-items-center mb-3'>
                      <div
                        className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3'
                        style={{ width: "48px", height: "48px" }}
                      >
                        <i className='bi bi-camera-video fs-4'></i>
                      </div>
                      <p className='h5 m-0 fw-bold'>
                        Konsultasi Personal via Zoom
                      </p>
                    </div>
                    <p className='text-muted ms-5 mb-0 lead fs-6'>
                      Sesi one-on-one dengan mentor melalui Zoom untuk membahas
                      kendala belajar, review code, dan konsultasi karir.
                    </p>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='card border-0 shadow-lg'>
                  <div className='card-body p-4 p-lg-5'>
                    <div className='text-center mb-4'>
                      <h3 className='h3 fw-bold mb-3'>
                        Investasi untuk Masa Depan
                      </h3>
                      <div className='d-flex justify-content-center align-items-baseline gap-2 mb-3'>
                        <span className='h4 mb-0'>Rp</span>
                        <span className='display-4 fw-bold text-primary'>
                          {parseInt(course.price).toLocaleString()}
                        </span>
                      </div>
                      <p className='text-muted mb-0 lead fs-6'>
                        Akses seumur hidup
                      </p>
                    </div>
                    <ul className='list-unstyled mb-4'>
                      {[
                        `${course.duration}+ jam video pembelajaran`,
                        "konsultasi personal via Zoom (Tentatif)",
                        "Code review & feedback personal",
                        "Update materi seumur hidup",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className='d-flex align-items-center mb-3'
                        >
                          <i className='bi bi-check2-circle text-primary fs-4 me-3'></i>
                          <span className='fs-6'>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className='btn btn-primary btn-lg w-100 py-3 fw-bold'
                      data-bs-toggle='modal'
                      data-bs-target='#order'
                    >
                      <i className='bi bi-rocket-takeoff-fill me-2'></i>
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with Pricing */}
        <section className='py-5 bg-primary text-white'>
          <div className='container text-center'>
            <h2 className='display-5 fw-bold mb-4'>
              Siap Memulai Perjalananmu?
            </h2>
            <p className='lead mb-5'>
              Bergabunglah dengan {course.enrollment_count}+ developer yang
              telah mengubah karir mereka melalui program ini.
            </p>

            <div className='row justify-content-center'>
              <div className='col-lg-8'>
                <div className='bg-dark p-4 p-lg-5 rounded-4 mb-4'>
                  <div className='text-center mb-4'>
                    <h3 className='text-warning h2 mb-3'>
                      🔥 Flash Sale Batch 1 🔥
                    </h3>
                    <p className='text-white-50 lead'>
                      Harga akan naik setelah kuota terpenuhi
                    </p>
                  </div>

                  <CountdownTimer />

                  <div className='price-tiers mt-4'>
                    {prices.map((price, index) => (
                      <div
                        key={index}
                        className={`d-flex justify-content-between align-items-center p-3 rounded mb-2 ${
                          index === 0 ? "bg-success" : "bg-light"
                        }`}
                        style={{ transition: "all 0.3s ease" }}
                      >
                        <div className='d-flex align-items-center'>
                          {index === 0 && (
                            <span className='badge bg-white text-success me-2 px-3 py-2 rounded-pill'>
                              <i className='bi bi-check-circle-fill me-1'></i>
                              Active
                            </span>
                          )}
                          <span
                            className={`${
                              index === 0 ? "text-white" : "text-dark"
                            } ${index === 0 ? "fw-bold" : ""}`}
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

                  <div className='text-center mt-5'>
                    <button
                      className='btn btn-warning btn-lg px-5 py-3 fw-bold w-100 mb-3'
                      data-bs-toggle='modal'
                      data-bs-target='#order'
                    >
                      <i className='bi bi-lock-fill me-2'></i>
                      Daftar Batch 1 - Rp{" "}
                      {prices[0].amount.toLocaleString("id-ID")}
                    </button>
                    <p className='text-warning mb-0'>
                      <i className='bi bi-clock-fill me-2'></i>
                      Tersisa {remainingSlots} slot lagi!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Form item={course} type='course' />
      <Footer />
    </>
  );
};

export default Fswd;
