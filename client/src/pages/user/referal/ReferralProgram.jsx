import React from "react";

// Mock data for referral products
const referralProducts = [
  {
    id: 1,
    title: "Advanced Web Development",
    type: "Course Bundle",
    description: "Complete web development course with modern technologies",
    commission: 25,
    price: 199.99,
    icon: "bi-code-square",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    type: "Video Course",
    description: "Master the art of modern UI/UX design",
    commission: 20,
    price: 149.99,
    icon: "bi-palette",
  },
  {
    id: 3,
    title: "Business Email Pro",
    type: "Service",
    description: "Professional email service for businesses",
    commission: 15,
    price: 99.99,
    icon: "bi-envelope",
  },
  {
    id: 4,
    title: "Cloud Hosting Plus",
    type: "Service",
    description: "Premium cloud hosting solution",
    commission: 30,
    price: 299.99,
    icon: "bi-cloud",
  },
];

const ReferralProgram = () => {
  return (
    <>
      {/* Referral Link Section */}
      <div className="card border-0 shadow-sm bg-primary bg-gradient text-white mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h4 className="mb-3">
                Invite friends and earn commission. They will get discount too!
              </h4>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value="https://example.com/ref=USER123"
                  readOnly
                />
                <button className="btn btn-light px-4">
                  <i className="bi bi-clipboard me-2"></i>
                  Copy link
                </button>
              </div>
            </div>
            <div className="col-lg-4 text-center mt-4 mt-lg-0">
              <i className="bi bi-gift display-1"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <h5 className="mb-4">Refer services to your friend</h5>
      <div className="row g-4">
        {referralProducts.map((product) => (
          <div key={product.id} className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                      <i className={`bi ${product.icon} fs-4 text-primary`}></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">{product.title}</h5>
                      <span className="badge bg-primary">{product.type}</span>
                    </div>
                    <p className="mb-3">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong className="fs-5">${product.price}</strong>
                        <span className="text-success ms-2">
                          {product.commission}% commission
                        </span>
                      </div>
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-share me-2"></i>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReferralProgram;
