import React from "react";
import { FaPhone } from "react-icons/fa";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      features: ["CMS", "CBT", "Database Siswa"],
      price: "Rp xxx.xxx/bln",
      isPopular: false,
    },
    {
      name: "Pro",
      features: ["Semua fitur + PPDB & Tahfiz"],
      price: "Rp xxx.xxx/bln",
      isPopular: true,
    },
    {
      name: "Enterprise",
      features: ["Semua fitur + Custom Module"],
      price: "Hubungi Kami",
      isPopular: false,
    },
  ];

  return (
    <section className='py-5 bg-light'>
      <div className='container'>
        <h2 className='text-center mb-5'>Harga Transparan & Terjangkau</h2>
        <div className='row g-4'>
          {plans.map((plan, index) => (
            <div key={index} className='col-md-4'>
              <div
                className={`card h-100 border-0 shadow-sm ${
                  plan.isPopular ? "border-primary" : ""
                }`}>
                {plan.isPopular && (
                  <div className='position-absolute top-0 start-50 translate-middle-x'>
                    <span className='badge bg-primary rounded-pill px-3 py-2'>
                      Paling Populer
                    </span>
                  </div>
                )}
                <div className='card-body text-center p-4'>
                  <h3 className='h4 mb-3'>{plan.name}</h3>
                  <div className='display-4 mb-4'>{plan.price}</div>
                  <ul className='list-unstyled mb-4'>
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className='mb-2'>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`btn ${
                      plan.isPopular ? "btn-primary" : "btn-outline-primary"
                    } w-100`}>
                    {plan.name === "Enterprise" ? (
                      <>
                        <FaPhone className='me-2' />
                        Konsultasi Gratis
                      </>
                    ) : (
                      "Mulai Sekarang"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
