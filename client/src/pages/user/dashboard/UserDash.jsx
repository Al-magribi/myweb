import React from "react";
import UserLayout from "../layout/UserLayout";

const UserDash = ({ user }) => {
  return (
    <UserLayout title="Dashboard" user={user}>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-book fs-1 text-primary"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Active Courses</h6>
                  <h3 className="mb-0">12</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-patch-check fs-1 text-success"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Completed</h6>
                  <h3 className="mb-0">5</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-clock-history fs-1 text-warning"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Hours Spent</h6>
                  <h3 className="mb-0">45</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <i className="bi bi-trophy fs-1 text-danger"></i>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Achievement</h6>
                  <h3 className="mb-0">8</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header border-0">
              <h5 className="card-title mb-0">Recent Courses</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-filetype-jsx text-primary me-2"></i>
                          React.js Fundamentals
                        </div>
                      </td>
                      <td style={{ width: "30%" }}>
                        <div className="progress" style={{ height: "5px" }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-success">In Progress</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          <i className="bi bi-play-fill me-1"></i>Continue
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-filetype-js text-warning me-2"></i>
                          Node.js Advanced
                        </div>
                      </td>
                      <td>
                        <div className="progress" style={{ height: "5px" }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-warning">On Hold</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          <i className="bi bi-arrow-clockwise me-1"></i>Resume
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-palette text-info me-2"></i>
                          UI/UX Design
                        </div>
                      </td>
                      <td>
                        <div className="progress" style={{ height: "5px" }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-info">Almost Done</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">
                          <i className="bi bi-play-fill me-1"></i>Continue
                        </button>
                      </td>
                    </tr>
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

export default UserDash;
