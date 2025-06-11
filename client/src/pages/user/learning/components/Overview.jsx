import React from "react";

const Overview = ({ data, formatDuration, formatPrice }) => {
  return (
    <div className="p-4">
      <h5 className="fw-bold mb-3">{data.title}</h5>
      <div className="mb-2">
        <span className="badge bg-secondary me-2">{data.category}</span>
        <span className="badge bg-info">{data.level}</span>
      </div>
      <div className="mb-2 text-muted">
        <i className="bi bi-person-circle me-2"></i>
        {data.instructor}
      </div>
      <div className="mb-2 text-muted">
        <i className="bi bi-clock me-2"></i>
        {formatDuration(data.duration)}
      </div>
      <div className="mb-2 text-muted">
        <i className="bi bi-currency-dollar me-2"></i>
        {formatPrice(data.price)}
      </div>
      <div
        className="mt-3 text-muted"
        dangerouslySetInnerHTML={{ __html: data.description }}
      />
    </div>
  );
};

export default Overview;
