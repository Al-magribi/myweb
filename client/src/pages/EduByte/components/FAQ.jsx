import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "Apakah EduByte bisa dipakai oleh semua jenjang sekolah?",
      answer:
        "Ya, EduByte didesain untuk bisa digunakan oleh semua jenjang pendidikan, mulai dari TK, SD, SMP, SMA, hingga perguruan tinggi.",
    },
    {
      question: "Apakah datanya bisa diimpor dari sistem lama?",
      answer:
        "Tentu saja! Tim kami akan membantu proses migrasi data dari sistem lama ke EduByte dengan aman dan terstruktur.",
    },
    {
      question: "Apakah bisa diakses lewat HP?",
      answer:
        "Ya, EduByte adalah platform yang mobile-responsive dan bisa diakses melalui smartphone, tablet, atau komputer.",
    },
    {
      question: "Siapa yang bisa mengelola sistemnya?",
      answer:
        "Sistem bisa dikelola oleh admin sekolah, guru, dan staf yang telah diberikan akses sesuai dengan peran masing-masing.",
    },
  ];

  return (
    <section className='py-5'>
      <div className='container'>
        <h2 className='text-center mb-5'>Pertanyaan yang Sering Diajukan</h2>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='accordion' id='faqAccordion'>
              {faqs.map((faq, index) => (
                <div key={index} className='accordion-item'>
                  <h2 className='accordion-header'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target={`#collapse${index}`}
                      aria-expanded='false'
                      aria-controls={`collapse${index}`}>
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className='accordion-collapse collapse'
                    data-bs-parent='#faqAccordion'>
                    <div className='accordion-body'>{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
