import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/MetaPixel/Form";

import {
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
} from "../../controller/api/product/ApiProduct";

const AI = () => {
  const [reviewPage, setReviewPage] = React.useState(1);
  const reviewLimit = 10;
  const id = 2;
  const { data: product } = useGetProductByIdQuery(id);
  const { data: reviewsData } = useGetProductReviewsQuery({
    productId: id,
    page: reviewPage,
    limit: reviewLimit,
  });

  // Countdown Fear Element
  const [countdown, setCountdown] = React.useState(0);
  const [deadline, setDeadline] = React.useState(null);

  React.useEffect(() => {
    // Cek localStorage untuk deadline
    let savedDeadline = localStorage.getItem("fearCountdownDeadline");
    if (!savedDeadline) {
      // Set deadline 3 jam dari sekarang
      const newDeadline = Date.now() + 3 * 60 * 60 * 1000;
      localStorage.setItem("fearCountdownDeadline", newDeadline);
      savedDeadline = newDeadline;
    }
    setDeadline(Number(savedDeadline));

    // Update countdown setiap detik
    const interval = setInterval(() => {
      const now = Date.now();
      let diff = Number(savedDeadline) - now;
      if (diff <= 0) {
        // Reset deadline ke 3 jam dari sekarang
        const newDeadline = Date.now() + 3 * 60 * 60 * 1000;
        localStorage.setItem("fearCountdownDeadline", newDeadline);
        setDeadline(newDeadline);
        diff = newDeadline - now;
      }
      setCountdown(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format ms ke HH:MM:SS
  const formatCountdown = (ms) => {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const calculatePercentage = (count) => {
    return (count / product?.reviewcount) * 100;
  };

  const handlePageChange = (newPage) => {
    setReviewPage(newPage);
  };

  const totalPages = Math.ceil((reviewsData?.total || 0) / reviewLimit);

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, reviewPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${reviewPage === i ? "active" : ""}`}>
          <button className='page-link' onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div className='bg-dark text-light min-vh-100'>
      <title>{product?.name}</title>
      <Navbar />

      <main className='container py-5' style={{ marginTop: 80 }}>
        {/* Hero Section */}
        <div className='text-center mb-5'>
          <h1 className='display-3 fw-bold mb-4'>{product?.name}</h1>
          <p className='text-danger fs-4 fw-semibold mb-4'>
            ⚠️ PERINGATAN: Jangan Biarkan AI Menggantikan Pekerjaanmu!
          </p>
          <div className='d-flex justify-content-center align-items-center gap-3 mb-4'>
            <div className='bg-warning px-3 py-2 rounded-pill'>
              <span className='fw-bold'>⭐ {product?.rating}</span> (
              {product?.reviewcount} reviews)
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className='row mb-5'>
          <div className='col-md-6'>
            <img
              src={product?.image}
              alt={product?.name}
              className='img-fluid rounded shadow-lg'
            />
          </div>
          <div className='col-md-6'>
            <div className='bg-dark p-4 rounded shadow-lg border border-secondary h-100'>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description }}
                className='text-light'
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className='bg-dark p-4 rounded shadow-lg mb-5 border border-secondary'>
          <h2 className='display-6 fw-bold mb-4'>
            <i className='fas fa-check-circle text-success me-2'></i>
            Apa yang Kamu Dapatkan?
          </h2>
          <div className='row g-4'>
            {product?.features?.map((feature, index) => (
              <div key={index} className='col-md-6'>
                <div className='d-flex align-items-center'>
                  <i className='fas fa-check text-success me-3'></i>
                  <p className='fs-5 mb-0'>{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bonus Section */}
        <div className='bg-dark p-4 rounded shadow-lg mb-5 border border-secondary'>
          <div className='row align-items-center'>
            <div className='col-lg-8'>
              <h2 className='display-6 fw-bold mb-3'>
                <i className='fas fa-gift text-primary me-2'></i>
                Bonus Eksklusif!
              </h2>

              <div className='card bg-white border-secondary'>
                <div className='card-body p-4'>
                  <div className='d-flex align-items-center mb-3'>
                    <i className='fab fa-elementor display-4 text-primary me-3'></i>
                    <div>
                      <h3 className='h4 fw-bold mb-2'>
                        Elementor Pro WordPress
                      </h3>
                      <p className='text-success fw-bold mb-0'>
                        Nilai: Rp 500.000
                      </p>
                    </div>
                  </div>
                  <ul className='list-unstyled mb-0'>
                    <li className='mb-2'>
                      <i className='fas fa-check text-success me-2'></i>Versi
                      Terbaru 2024
                    </li>
                    <li className='mb-2'>
                      <i className='fas fa-check text-success me-2'></i>Lifetime
                      License
                    </li>
                    <li className='mb-2'>
                      <i className='fas fa-check text-success me-2'></i>Update
                      Gratis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-lg-4 mt-4 mt-lg-0'>
              <div className='bg-warning p-4 rounded text-center'>
                <h3 className='h4 fw-bold mb-3'>Dapatkan Sekarang!</h3>
                <p className='mb-3'>
                  Bonus senilai Rp 500.000 akan diberikan setelah pembelian
                </p>
                <button
                  data-bs-toggle='modal'
                  data-bs-target='#order'
                  className='btn btn-dark btn-lg fw-bold px-4 py-2'
                >
                  <i className='fas fa-gift me-2'></i>
                  Klaim Bonus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center mb-5'>
          <div
            className='d-inline-block bg-danger rounded-4 shadow-lg position-relative'
            style={{
              minWidth: 320,
              maxWidth: 420,
              padding: "2.5rem 2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              borderRadius: 18,
            }}
          >
            <h3
              className='fw-bold mb-3 text-white'
              style={{ fontSize: 32, letterSpacing: 1 }}
            >
              Yuk Cepat Beli!
            </h3>
            {/* FEAR COUNTDOWN */}
            <div className='mb-4'>
              <span
                className='badge bg-warning text-dark d-block mx-auto'
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  padding: "1rem 0",
                  borderRadius: 12,
                  minWidth: 260,
                  letterSpacing: 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {countdown > 0 ? (
                  <>
                    <i className='fas fa-hourglass-half me-2'></i>
                    Sisa waktu promo:
                    <span
                      className='fw-bold'
                      style={{
                        fontVariantNumeric: "tabular-nums",
                        animation: "blink 1s steps(1) infinite",
                        color: "#222",
                        marginLeft: 6,
                      }}
                    >
                      {formatCountdown(countdown)}
                    </span>
                  </>
                ) : (
                  <>
                    <i className='fas fa-exclamation-triangle me-2'></i>
                    Waktu promo habis!
                  </>
                )}
              </span>
            </div>
            <div className='mb-4'>
              <span
                className='text-decoration-line-through fs-6 text-white-50'
                style={{ marginRight: 8 }}
              >
                Rp 99.000
              </span>
              <span
                className='fs-1 fw-bold text-warning'
                style={{ fontSize: 38 }}
              >
                Rp {parseInt(product?.price).toLocaleString("id-ID")}
              </span>
            </div>
            <button
              data-bs-toggle='modal'
              data-bs-target='#order'
              className='btn btn-warning btn-lg fw-bold px-5 py-3 shadow-sm'
              style={{ fontSize: 20, letterSpacing: 1, borderRadius: 12 }}
            >
              <i className='fas fa-lock me-2'></i>
              Beli Sekarang
            </button>
          </div>
        </div>
        {/* Animasi blink untuk countdown detik */}
        <style>{`
          @keyframes blink { 50% { opacity: 0.5; } }
        `}</style>

        <Form item={product} type='product' />

        {/* Reviews Section */}
        {product && (
          <div className='bg-dark text-light p-4 rounded shadow-lg border border-secondary'>
            <h2 className='display-6 fw-bold mb-4'>
              <i className='fas fa-star text-warning me-2'></i>
              Ulasan Pembaca
            </h2>

            {/* Rating Overview */}
            <div className='row align-items-center mb-4'>
              <div className='col-md-4 text-center'>
                <div className='display-1 fw-bold text-warning'>
                  {product.rating}
                </div>
                <div className='text-warning mb-2'>
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && "½"}
                  {"☆".repeat(5 - Math.ceil(product.rating))}
                </div>
                <div className='text-muted'>{product.reviewcount} ulasan</div>
              </div>
              <div className='col-md-8'>
                {/* Rating Breakdown */}
                {Object.entries(product.ratingBreakdown)
                  .reverse()
                  .map(([stars, count]) => (
                    <div key={stars} className='d-flex align-items-center mb-2'>
                      <div className='me-2' style={{ width: "60px" }}>
                        {stars} ★
                      </div>
                      <div
                        className='progress flex-grow-1'
                        style={{ height: "20px" }}
                      >
                        <div
                          className='progress-bar bg-warning'
                          role='progressbar'
                          style={{ width: `${calculatePercentage(count)}%` }}
                          aria-valuenow={calculatePercentage(count)}
                          aria-valuemin='0'
                          aria-valuemax='100'
                        ></div>
                      </div>
                      <div className='ms-2' style={{ width: "60px" }}>
                        {count}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className='row g-4 mb-4'>
              {reviewsData?.reviews?.map((review) => (
                <div key={review.id} className='col-md-6'>
                  <div className='border border-secondary rounded p-3 h-100'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                      <h5 className='mb-0'>{review.name}</h5>
                      <div className='text-warning'>
                        {"★".repeat(review.rating)}
                      </div>
                    </div>
                    <p className='mb-2'>{review.comment}</p>
                    <small className='text-muted d-block mt-auto'>
                      {new Date(review.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </small>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='d-flex justify-content-center'>
                <nav aria-label='Review pagination'>
                  <ul className='pagination pagination-sm'>
                    {/* First Page */}
                    <li
                      className={`page-item ${
                        reviewPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(1)}
                        disabled={reviewPage === 1}
                        aria-label='First page'
                      >
                        <i className='bi bi-chevron-double-left'></i>
                      </button>
                    </li>
                    {/* Previous Page */}
                    <li
                      className={`page-item ${
                        reviewPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(reviewPage - 1)}
                        disabled={reviewPage === 1}
                        aria-label='Previous page'
                      >
                        <i className='bi bi-chevron-left'></i>
                      </button>
                    </li>

                    {/* Page Numbers */}
                    {renderPaginationNumbers()}

                    {/* Next Page */}
                    <li
                      className={`page-item ${
                        reviewPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(reviewPage + 1)}
                        disabled={reviewPage === totalPages}
                        aria-label='Next page'
                      >
                        <i className='bi bi-chevron-right'></i>
                      </button>
                    </li>
                    {/* Last Page */}
                    <li
                      className={`page-item ${
                        reviewPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(totalPages)}
                        disabled={reviewPage === totalPages}
                        aria-label='Last page'
                      >
                        <i className='bi bi-chevron-bar-right'></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AI;
