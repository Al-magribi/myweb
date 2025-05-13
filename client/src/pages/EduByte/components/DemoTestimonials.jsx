import React from "react";

const DemoTestimonials = () => {
  const testimonials = [
    {
      name: "Budi Santoso",
      position: "Kepala Sekolah",
      school: "SMA Negeri 1 Jakarta",
      quote:
        "EduByte telah membantu kami dalam mengelola sekolah dengan lebih efisien. Semua proses administrasi menjadi lebih mudah dan terorganisir.",
      image: "/testimonial-1.jpg",
    },
    {
      name: "Siti Aminah",
      position: "Guru",
      school: "SMP Islam Terpadu",
      quote:
        "Sistem CBT dari EduByte sangat membantu dalam melaksanakan ujian online. Analisis jawaban siswa juga sangat detail dan membantu evaluasi pembelajaran.",
      image: "/testimonial-2.jpg",
    },
    {
      name: "Ahmad Rizki",
      position: "Admin Sekolah",
      school: "SD Bintang Cerdas",
      quote:
        "Dengan EduByte, kami bisa mengelola database siswa dan guru dengan lebih baik. Sistem pembayaran yang terintegrasi juga sangat membantu.",
      image: "/testimonial-3.jpg",
    },
  ];

  return (
    <section className='py-5 bg-light'>
      <div className='container'>
        <h2 className='text-center mb-5'>
          Dipercaya oleh Sekolah-sekolah di Indonesia
        </h2>
        <div className='row g-4'>
          <div className='col-lg-6'>
            <div className='ratio ratio-16x9 mb-4'>
              <iframe
                src='https://www.youtube.com/embed/your-video-id'
                title='Demo EduByte'
                allowFullScreen
                className='rounded shadow'></iframe>
            </div>
          </div>
          <div className='col-lg-6'>
            <div
              id='testimonialCarousel'
              className='carousel slide'
              data-bs-ride='carousel'>
              <div className='carousel-inner'>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <div className='card border-0 shadow-sm h-100'>
                      <div className='card-body p-4'>
                        <div className='d-flex align-items-center mb-4'>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className='rounded-circle me-3'
                            width='60'
                            height='60'
                          />
                          <div>
                            <h5 className='mb-1'>{testimonial.name}</h5>
                            <p className='text-muted mb-0'>
                              {testimonial.position} - {testimonial.school}
                            </p>
                          </div>
                        </div>
                        <p className='mb-0'>{testimonial.quote}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className='carousel-control-prev'
                type='button'
                data-bs-target='#testimonialCarousel'
                data-bs-slide='prev'>
                <span
                  className='carousel-control-prev-icon'
                  aria-hidden='true'></span>
                <span className='visually-hidden'>Previous</span>
              </button>
              <button
                className='carousel-control-next'
                type='button'
                data-bs-target='#testimonialCarousel'
                data-bs-slide='next'>
                <span
                  className='carousel-control-next-icon'
                  aria-hidden='true'></span>
                <span className='visually-hidden'>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoTestimonials;
