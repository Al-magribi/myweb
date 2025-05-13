import React from "react";
import {
  FaBrain,
  FaEdit,
  FaChartBar,
  FaUserGraduate,
  FaBullseye,
  FaSchool,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBook,
} from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaBrain className='display-4' />,
      title: "Content Management System (CMS)",
      description: "Publikasi berita, agenda, & galeri sekolah",
    },
    {
      icon: <FaEdit className='display-4' />,
      title: "Computer Based Test (CBT)",
      description: "Ujian online interaktif & otomatis",
    },
    {
      icon: <FaChartBar className='display-4' />,
      title: "Analisis Jawaban Siswa",
      description: "Statistik performa & evaluasi soal",
    },
    {
      icon: <FaUserGraduate className='display-4' />,
      title: "Database Siswa & Guru",
      description: "Terpusat dan mudah diakses",
    },
    {
      icon: <FaBullseye className='display-4' />,
      title: "Analisa Potensi Siswa Baru",
      description: "Prediksi performa sejak awal",
    },
    {
      icon: <FaSchool className='display-4' />,
      title: "PPDB Digital",
      description: "Penerimaan murid baru jadi lebih rapi dan online",
    },
    {
      icon: <FaMoneyBillWave className='display-4' />,
      title: "Sistem Pembayaran Sekolah",
      description: "Tagihan otomatis, histori pembayaran lengkap",
    },
    {
      icon: <FaCalendarAlt className='display-4' />,
      title: "Absensi Otomatis",
      description: "Untuk guru dan siswa, sinkron dengan laporan",
    },
    {
      icon: <FaBook className='display-4' />,
      title: "Laporan Tahfiz",
      description: "Pantau perkembangan hafalan siswa secara berkala",
    },
  ];

  return (
    <section className='py-5 bg-light'>
      <div className='container'>
        <h2 className='text-center mb-5'>
          Semua Fitur yang Dibutuhkan Sekolah Modern, Dalam Satu Platform
        </h2>
        <div className='row g-4'>
          {features.map((feature, index) => (
            <div key={index} className='col-md-6 col-lg-4'>
              <div className='card h-100 border-0 shadow-sm'>
                <div className='card-body text-center'>
                  <div className='mb-3 text-primary'>{feature.icon}</div>
                  <h3 className='h5 mb-3'>{feature.title}</h3>
                  <p className='text-muted mb-0'>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
