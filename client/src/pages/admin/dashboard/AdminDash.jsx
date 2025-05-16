import React from "react";
import Layout from "../layout/Layout";
import {
  FaUsers,
  FaShoppingCart,
  FaProjectDiagram,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useGetStatsQuery } from "../../../controller/api/admin/ApiDash";
import { formatCurrency } from "../../../utils/format";

const AdminDash = () => {
  const { data, isLoading, error } = useGetStatsQuery();

  if (isLoading) {
    return (
      <Layout title="Admin Dashboard">
        <div className="container-fluid">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Admin Dashboard">
        <div className="container-fluid">
          <div className="alert alert-danger" role="alert">
            Error loading dashboard data
          </div>
        </div>
      </Layout>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: data?.stats?.totalUsers || 0,
      icon: <FaUsers className="text-primary" />,
    },
    {
      title: "Total Products",
      value: data?.stats?.totalProducts || 0,
      icon: <FaShoppingCart className="text-success" />,
    },
    {
      title: "Total Orders",
      value: data?.stats?.totalOrders || 0,
      icon: <FaProjectDiagram className="text-warning" />,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(data?.stats?.totalRevenue || 0),
      icon: <FaMoneyBillWave className="text-info" />,
    },
  ];

  return (
    <Layout title="Admin Dashboard">
      <div className="container-fluid">
        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="col-12 col-sm-6 col-xl-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="p-3 rounded bg-light">{stat.icon}</div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="text-muted mb-1">{stat.title}</h6>
                      <h4 className="mb-0">{stat.value}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity and Quick Stats */}
        <div className="row g-4">
          {/* Recent Orders */}
          <div className="col-12 col-lg-9">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">Recent Orders</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Customer</th>

                        <th>Phone</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.recentOrders?.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <p className="mb-0">{order.name}</p>
                            <p
                              style={{ fontSize: "10px" }}
                              className="text-muted mb-0"
                            >
                              {order.email}
                            </p>
                          </td>
                          <td>{order.phone}</td>
                          <td>{formatCurrency(order.total_amount)}</td>
                          <td>
                            <span
                              className={`badge bg-${
                                order.status === "settlement"
                                  ? "success"
                                  : order.status === "pending"
                                  ? "warning"
                                  : "danger"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>
                            {new Date(order.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="col-12 col-lg-3">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">Top Selling Products</h5>
              </div>
              <div className="card-body">
                {data?.topProducts?.map((product) => (
                  <div key={product.id} className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-grow-1">{product.name}</div>
                      <div className="flex-shrink-0">
                        <span className="badge bg-primary">
                          {product.total_quantity} sold
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDash;
