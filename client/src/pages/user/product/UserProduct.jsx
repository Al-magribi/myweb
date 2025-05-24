import React from "react";
import UserLayout from "../layout/UserLayout";

const UserProduct = () => {
  // Sample data - replace with actual purchased products data from your backend
  const purchasedProducts = [
    {
      id: 1,
      title: "Advanced JavaScript Course Bundle",
      type: "Course Bundle",
      purchaseDate: "2024-03-15",
      expiryDate: "2025-03-15",
      price: 199.99,
      thumbnail: "https://placehold.co/600x400",
      accessStatus: "Active",
      progress: 45,
      totalItems: 24,
      completedItems: 11,
      lastAccessed: "2024-03-20",
    },
    {
      id: 2,
      title: "React & Node.js Full Stack Guide",
      type: "Video Course",
      purchaseDate: "2024-02-28",
      expiryDate: "2025-02-28",
      price: 89.99,
      thumbnail: "https://placehold.co/600x400",
      accessStatus: "Active",
      progress: 75,
      totalItems: 18,
      completedItems: 14,
      lastAccessed: "2024-03-19",
    },
    {
      id: 3,
      title: "UI/UX Design Resources Pack",
      type: "Resource Pack",
      purchaseDate: "2024-01-15",
      expiryDate: "2025-01-15",
      price: 49.99,
      thumbnail: "https://placehold.co/600x400",
      accessStatus: "Expired",
      progress: 100,
      totalItems: 15,
      completedItems: 15,
      lastAccessed: "2024-02-20",
    },
  ];

  const activeProducts = purchasedProducts.filter(
    (p) => p.accessStatus === "Active"
  ).length;
  const totalSpent = purchasedProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );
  const averageProgress = Math.round(
    purchasedProducts.reduce((sum, product) => sum + product.progress, 0) /
      purchasedProducts.length
  );

  return (
    <UserLayout title="My Products">
      {/* Purchased Products */}
      <div className="card border-0 shadow-sm">
        <div className="card-header border-0 bg-transparent">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Purchased Products</h5>
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm">
                <option value="all">All Types</option>
                <option value="course">Courses</option>
                <option value="bundle">Bundles</option>
                <option value="resource">Resources</option>
              </select>
              <select className="form-select form-select-sm">
                <option value="recent">Recently Accessed</option>
                <option value="oldest">Oldest First</option>
                <option value="progress">By Progress</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {purchasedProducts.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary">{product.type}</span>
                      <span
                        className={`badge ${
                          product.accessStatus === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {product.accessStatus}
                      </span>
                    </div>
                    <h5 className="card-title mb-2">{product.title}</h5>
                    <div className="small mb-3">
                      <div className="mb-1">
                        <i className="bi bi-calendar me-2"></i>
                        Purchased: {product.purchaseDate}
                      </div>
                      <div>
                        <i className="bi bi-clock-history me-2"></i>
                        Last accessed: {product.lastAccessed}
                      </div>
                    </div>

                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${product.progress}%` }}
                        aria-valuenow={product.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="small">
                        {product.completedItems} of {product.totalItems} items
                      </span>
                      <span className="fw-bold">{product.progress}%</span>
                    </div>

                    <div className="d-grid">
                      <button
                        className={`btn ${
                          product.accessStatus === "Active"
                            ? "btn-primary"
                            : "btn-outline-danger"
                        }`}
                        disabled={product.accessStatus !== "Active"}
                      >
                        {product.accessStatus === "Active" ? (
                          <>
                            <i className="bi bi-play-circle me-2"></i>
                            Continue Learning
                          </>
                        ) : (
                          <>
                            <i className="bi bi-lock me-2"></i>
                            Access Expired
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProduct;
