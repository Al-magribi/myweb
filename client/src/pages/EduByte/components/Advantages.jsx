import React from "react";
import {
  FaBolt,
  FaLock,
  FaTools,
  FaMobileAlt,
  FaBriefcase,
} from "react-icons/fa";

const Advantages = () => {
  const advantages = [
    {
      icon: <FaBolt className='display-4' />,
      title: "Cepat & Mudah Digunakan",
      description: "Desain user-friendly untuk semua kalangan",
    },
    {
      icon: <FaLock className='display-4' />,
      title: "Keamanan Data Terjamin",
      description: "Dengan enkripsi & backup otomatis",
    },
    {
      icon: <FaTools className='display-4' />,
      title: "Bisa Disesuaikan (Customizable)",
      description: "Fleksibel sesuai kebutuhan sekolah",
    },
    {
      icon: <FaMobileAlt className='display-4' />,
      title: "Akses dari Mana Saja",
      description: "Mobile responsive & cloud-based",
    },
    {
      icon: <FaBriefcase className='display-4' />,
      title: "Dukungan Teknis Aktif",
      description: "Support via WhatsApp, Zoom, dan email",
    },
  ];

  return (
    <section className='py-5'>
      <div className='container'>
        <h2 className='text-center mb-5'>
          Kenapa Sekolah Harus Memilih EduByte?
        </h2>
        <div className='row g-4'>
          {advantages.map((advantage, index) => (
            <div key={index} className='col-md-6 col-lg-4'>
              <div className='card h-100 border-0 shadow-sm'>
                <div className='card-body text-center'>
                  <div className='mb-3 text-primary'>{advantage.icon}</div>
                  <h3 className='h5 mb-3'>{advantage.title}</h3>
                  <p className='text-muted mb-0'>{advantage.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
