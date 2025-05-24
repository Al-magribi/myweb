import React from "react";

// Mock data for earnings
const earnings = [
  {
    id: 1,
    product: "Advanced Web Development",
    customer: "John Doe",
    date: "2024-03-15",
    commission: 49.99,
    status: "Paid",
  },
  {
    id: 2,
    product: "UI/UX Design Masterclass",
    customer: "Jane Smith",
    date: "2024-03-14",
    commission: 29.99,
    status: "Pending",
  },
  {
    id: 3,
    product: "Cloud Hosting Plus",
    customer: "Mike Johnson",
    date: "2024-03-12",
    commission: 89.99,
    status: "Paid",
  },
];

const ReferralEarnings = () => {
  const totalEarnings = earnings.reduce(
    (sum, earning) => sum + earning.commission,
    0
  );
  const pendingEarnings = earnings
    .filter((e) => e.status === "Pending")
    .reduce((sum, earning) => sum + earning.commission, 0);

  return (
    <>
      {/* Earnings Summary */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-wallet2 fs-1 text-success"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Total Earnings</h6>
                  <h3 className="mb-0">${totalEarnings.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-hourglass-split fs-1 text-warning"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Pending Earnings</h6>
                  <h3 className="mb-0">${pendingEarnings.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header border-0 bg-transparent">
          <h5 className="card-title mb-0">Earnings History</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Commission</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {earnings.map((earning) => (
                  <tr key={earning.id}>
                    <td>{earning.date}</td>
                    <td>{earning.product}</td>
                    <td>{earning.customer}</td>
                    <td>${earning.commission.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge ${
                          earning.status === "Paid"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {earning.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferralEarnings;
