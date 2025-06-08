import React, { useState, useEffect } from "react";
import UserLayout from "../layout/UserLayout";
import { useGetUserOrderQuery } from "../../../controller/api/order/ApiOrder";

const UserPayment = () => {
  const { data, isLoading } = useGetUserOrderQuery();

  if (isLoading) {
    return (
      <UserLayout title='User Payment'>
        <div className='d-flex justify-content-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      </UserLayout>
    );
  }

  const { orders = [], enrollments = [] } = data || {};

  // Calculate total spent from both orders and enrollments
  const totalSpent =
    orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0) +
    enrollments.reduce(
      (sum, enrollment) => sum + parseFloat(enrollment.price),
      0
    );

  // Calculate completed transactions from both orders and enrollments
  const completedTransactions =
    orders.filter((order) => order.status === "settlement").length +
    enrollments.filter((enrollment) => enrollment.status === "settlement")
      .length;

  // Calculate pending transactions from both orders and enrollments
  const pendingTransactions =
    orders.filter((order) => order.status !== "settlement").length +
    enrollments.filter((enrollment) => enrollment.status !== "settlement")
      .length;

  return (
    <UserLayout title='User Payment'>
      {/* Summary Cards */}
      <div className='row g-4 mb-4'>
        <div className='col-md-4'>
          <div className='card h-100 border-0 shadow-sm'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0'>
                  <i className='bi bi-wallet2 fs-1 text-primary'></i>
                </div>
                <div className='flex-grow-1 ms-3'>
                  <h6 className='mb-1'>Total Spent</h6>
                  <h3 className='mb-0'>
                    Rp {totalSpent.toLocaleString("id-ID")}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card h-100 border-0 shadow-sm'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0'>
                  <i className='bi bi-check-circle fs-1 text-success'></i>
                </div>
                <div className='flex-grow-1 ms-3'>
                  <h6 className='mb-1'>Completed Transactions</h6>
                  <h3 className='mb-0'>{completedTransactions}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card h-100 border-0 shadow-sm'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>
                <div className='flex-shrink-0'>
                  <i className='bi bi-hourglass-split fs-1 text-warning'></i>
                </div>
                <div className='flex-grow-1 ms-3'>
                  <h6 className='mb-1'>Pending Transactions</h6>
                  <h3 className='mb-0'>{pendingTransactions}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className='row mb-4'>
        <div className='col-12'>
          <div className='card border-0 shadow-sm'>
            <div className='card-header border-0 bg-transparent'>
              <div className='d-flex justify-content-between align-items-center'>
                <h5 className='card-title mb-0'>Order History</h5>
                <button className='btn btn-primary btn-sm'>
                  <i className='bi bi-download me-2'></i>
                  Export
                </button>
              </div>
            </div>
            <div className='card-body'>
              <div className='row g-4'>
                {orders.map((order) => (
                  <div key={order.id} className='col-md-6 col-lg-4'>
                    <div className='card h-100 border-0 shadow-sm hover-shadow'>
                      <div className='position-relative'>
                        {order.item_image && (
                          <img
                            src={order.item_image}
                            alt={order.item_name}
                            className='card-img-top'
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        )}
                        <span
                          className={`badge position-absolute top-0 end-0 m-2 ${
                            order.status === "settlement"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-start mb-2'>
                          <h6 className='card-title mb-0'>{order.item_name}</h6>
                          <span className='badge bg-info'>
                            {order.type === "course" ? "Course" : "Product"}
                          </span>
                        </div>
                        <p className='card-text text-muted mb-2'>
                          <small>Order Code: {order.order_code}</small>
                        </p>
                        <div className='d-flex justify-content-between align-items-center'>
                          <h5 className='mb-0 text-primary'>
                            Rp{" "}
                            {parseFloat(order.total_amount).toLocaleString(
                              "id-ID"
                            )}
                          </h5>
                          <button className='btn btn-sm btn-outline-primary'>
                            <i className='bi bi-eye me-1'></i>
                            View Details
                          </button>
                        </div>
                      </div>
                      <div className='card-footer bg-transparent border-0'>
                        <small className='text-muted'>
                          Ordered on{" "}
                          {new Date(order.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollments Section */}
      <div className='row'>
        <div className='col-12'>
          <div className='card border-0 shadow-sm'>
            <div className='card-header border-0 bg-transparent'>
              <h5 className='card-title mb-0'>Course Enrollments</h5>
            </div>
            <div className='card-body'>
              <div className='row g-4'>
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className='col-md-6 col-lg-4'>
                    <div className='card h-100 border-0 shadow-sm hover-shadow'>
                      <div className='position-relative'>
                        {enrollment.course_image && (
                          <img
                            src={enrollment.course_image}
                            alt={enrollment.course_name}
                            className='card-img-top'
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        )}
                        <span
                          className={`badge position-absolute top-0 end-0 m-2 ${
                            enrollment.status === "settlement"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </div>
                      <div className='card-body'>
                        <h6 className='card-title mb-2'>
                          {enrollment.course_name}
                        </h6>

                        <div className='d-flex justify-content-between align-items-center'>
                          <h5 className='mb-0 text-primary'>
                            Rp{" "}
                            {parseFloat(enrollment.price).toLocaleString(
                              "id-ID"
                            )}
                          </h5>
                          <small className='text-muted'>
                            Enrolled on{" "}
                            {new Date(enrollment.created_at).toLocaleDateString(
                              "id-ID"
                            )}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-shadow {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </UserLayout>
  );
};

export default UserPayment;
