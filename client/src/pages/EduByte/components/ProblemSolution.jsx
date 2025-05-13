import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const ProblemSolution = () => {
  const problems = [
    "Administrasi masih manual dan membuang waktu",
    "Kesulitan pantau absensi dan perkembangan siswa",
    "Tes online tidak terintegrasi",
    "Sulit menganalisis potensi siswa baru",
    "Sistem pembayaran tidak tertata",
  ];

  const solutions = [
    "Semua fitur dalam satu platform",
    "Otomatisasi proses administrasi dan pelaporan",
    "Analisis jawaban & data siswa secara real-time",
    "Sistem PPDB digital dengan analisa potensi",
    "Pembayaran sekolah online & transparan",
  ];

  return (
    <section className='py-5'>
      <div className='container'>
        <h2 className='text-center mb-5'>
          Masalah Umum Sekolah Tradisional? EduByte Punya Solusinya!
        </h2>
        <div className='row g-4'>
          <div className='col-md-6'>
            <div className='p-4 border rounded shadow-sm'>
              <h3 className='h4 mb-4'>Masalah yang Sering Dihadapi</h3>
              <ul className='list-group list-group-flush'>
                {problems.map((problem, index) => (
                  <li key={index} className='list-group-item border-0 py-2'>
                    <FaTimes className='text-danger me-2' />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='p-4 border rounded shadow-sm bg-light'>
              <h3 className='h4 mb-4'>Solusi EduByte</h3>
              <ul className='list-group list-group-flush'>
                {solutions.map((solution, index) => (
                  <li key={index} className='list-group-item border-0 py-2'>
                    <FaCheck className='text-success me-2' />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
