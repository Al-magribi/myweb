import React, { useState, useEffect } from "react";
import UserLayout from "../layout/UserLayout";

const UserPayment = () => {
  // Sample data - replace with actual data from your backend
  const payments = [
    {
      id: 1,
      date: "2024-03-15",
      course: "Advanced Web Development",
      amount: 99.99,
      status: "Completed",
      invoice: "#INV-001",
    },
    {
      id: 2,
      date: "2024-03-10",
      course: "UI/UX Design Fundamentals",
      amount: 79.99,
      status: "Completed",
      invoice: "#INV-002",
    },
    {
      id: 3,
      date: "2024-03-05",
      course: "Mobile App Development",
      amount: 149.99,
      status: "Pending",
      invoice: "#INV-003",
    },
  ];

  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = payments.filter(
    (p) => p.status === "Completed"
  ).length;
  const pendingPayments = payments.filter((p) => p.status === "Pending").length;

  return (
    <UserLayout title="User Payment">
      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-wallet2 fs-1 text-primary"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Total Spent</h6>
                  <h3 className="mb-0">${totalSpent.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-check-circle fs-1 text-success"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Completed Payments</h6>
                  <h3 className="mb-0">{completedPayments}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-hourglass-split fs-1 text-warning"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Pending Payments</h6>
                  <h3 className="mb-0">{pendingPayments}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header border-0 bg-transparent">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Payment History</h5>
                <button className="btn btn-primary btn-sm">
                  <i className="bi bi-download me-2"></i>
                  Export
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Course</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Invoice</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.date}</td>
                        <td>{payment.course}</td>
                        <td>${payment.amount.toFixed(2)}</td>
                        <td>
                          <span
                            className={`badge ${
                              payment.status === "Completed"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td>{payment.invoice}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            title="Download Invoice"
                          >
                            <i className="bi bi-file-earmark-pdf"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserPayment;
