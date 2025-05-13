import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const createMarkup = (html) => {
  return { __html: html };
};

const courses = [
  {
    title: "Javascript Full Stack Web Developer",
    description: `<p><strong>Mau Jadi Full-Stack Web Developer? </strong></p>
<p><strong>Mulai dari Sini!</strong></p>
<p>Pernah kepikiran gimana caranya bikin website keren sendiri?</p>
<p>Atau mungkin pengen jadi&nbsp;<strong>Full-Stack Web Developer</strong>&nbsp;yang bisa ngerjain proyek dari awal sampai akhir?</p>
<p>Kalau iya, ini dia kursus yang pas buat kamu!</p>
<p><strong>JavaScript Full-Stack Web Developer</strong>&nbsp;pertama dalam&nbsp;<strong>Bahasa Indonesia</strong>&nbsp;di Udemy hadir buat bantu kamu&nbsp;<strong>belajar dari nol sampai mahir</strong>.</p>
<p>Kursus ini bakal ngajarin kamu&nbsp;<strong>JavaScript dari dasar hingga tingkat lanjut</strong>, lengkap dengan teknologi&nbsp;<strong>Front-End (React, Next.js)</strong>&nbsp;dan&nbsp;<strong>Back-End (Node.js, Express, MongoDB, Postgresql)</strong>.</p>
<p>Belajarnya nggak bakal bikin bosan, karena kita pakai metode&nbsp;<strong>Project-Based Learning</strong>. Jadi, kamu nggak cuma belajar teori, tapi langsung praktik dengan proyek nyata. Ini penting banget buat nambah pengalaman dan bikin portofolio yang bisa dipamerin ke calon klien atau perusahaan impian. Mau mulai dari nol? Tenang aja! Kursus ini dirancang dengan konsep&nbsp;<strong>zero to hero</strong>, jadi&nbsp;<strong>meskipun kamu belum pernah coding sama sekali, kamu tetap bisa ikut</strong>&nbsp;dan berkembang sampai jadi developer handal.</p>
<p>Nggak perlu khawatir soal biaya, karena ada&nbsp;<strong>garansi 30 hari uang kembali</strong>&nbsp;sesuai kebijakan Udemy. Jadi, kalau kamu merasa kursus ini nggak sesuai ekspektasi, bisa refund tanpa ribet! Kesempatan emas buat kamu yang mau serius terjun ke dunia programming. Yuk, daftar sekarang dan mulai perjalananmu jadi&nbsp;<strong>Full-Stack Web Developer profesional</strong>!</p>`,
    img: "https://res.cloudinary.com/dmsxwwfb5/image/upload/v1595866967/full-stack-devlopment-min.png",
    link: "/full-stack-web-developer",
  },
  {
    title: "Ecommerce TOSERBA",
    description: `Kursus lengkap tentang membangun proyek e-commerce menggunakan stack MERN (MongoDB, Express.js, React.js, Node.js) yang terintegrasi dengan Midtrans, Raja Ongkir, dan fitur chat real-time!
`,
    img: "https://idwebhost.com/blog/wp-content/uploads/2025/01/mern-a-1.webp",
    link: "/ecommerce-toserba",
  },
];

const Course = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Fragment>
      <Navbar />

      <main
        style={{ minHeight: "80vh", marginTop: 80 }}
        className='container py-5'>
        <h1 className='text-center mb-5'>Courses</h1>
        <div className='row row-cols-1 row-cols-md-2 g-4'>
          {courses.map((course, index) => (
            <div key={index} className='col'>
              <div className='card h-100 shadow-sm'>
                <img
                  src={course.img}
                  className='card-img-top'
                  alt={course.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{course.title}</h5>
                  <div
                    className='card-text'
                    dangerouslySetInnerHTML={createMarkup(course.description)}
                  />
                </div>
                <div className='card-footer bg-white border-top-0'>
                  <button
                    onClick={() => handleNavigate(course.link)}
                    className='btn btn-primary w-100'>
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </Fragment>
  );
};

export default Course;
