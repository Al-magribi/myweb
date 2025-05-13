import React from "react";

const Reviews = ({
  isReviewLoading,
  reviewData,
  reviewPage,
  setReviewPage,
  reviewLimit,
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className='bi bi-star-fill text-warning'></i>
      );
    }
    if (hasHalfStar) {
      stars.push(<i key='half' className='bi bi-star-half text-warning'></i>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className='bi bi-star text-warning'></i>
      );
    }

    return stars;
  };

  return (
    <div>
      {isReviewLoading ? (
        <div className='text-center py-4'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : reviewData && reviewData.reviews.length > 0 ? (
        <>
          {reviewData.reviews.map((review) => (
            <div key={review.id} className='card mb-3'>
              <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center mb-2'>
                  <div>
                    <h6 className='mb-0'>{review.name}</h6>
                  </div>
                  <div className='text-warning'>
                    {renderStars(review.rating)}
                  </div>
                </div>
                {review.comment && (
                  <p className='card-text mb-0'>{review.comment}</p>
                )}
              </div>
            </div>
          ))}
          {/* Pagination Controls */}
          <nav className='mt-3'>
            <ul className='pagination pagination-sm justify-content-center'>
              {/* First page button */}
              <li className={`page-item ${reviewPage === 1 ? "disabled" : ""}`}>
                <button
                  className='page-link'
                  onClick={() => setReviewPage(1)}
                  disabled={reviewPage === 1}>
                  <i className='bi bi-chevron-bar-left'></i>
                </button>
              </li>
              {/* Previous page button */}
              <li className={`page-item ${reviewPage === 1 ? "disabled" : ""}`}>
                <button
                  className='page-link'
                  onClick={() => setReviewPage(reviewPage - 1)}
                  disabled={reviewPage === 1}>
                  <i className='bi bi-chevron-double-left'></i>
                </button>
              </li>
              {/* Numbered page buttons (max 5) */}
              {(() => {
                const totalPages = Math.ceil(
                  (reviewData.total || 0) / reviewLimit
                );
                let start = Math.max(1, reviewPage - 2);
                let end = Math.min(totalPages, reviewPage + 2);
                if (end - start < 4) {
                  if (start === 1) {
                    end = Math.min(totalPages, start + 4);
                  } else if (end === totalPages) {
                    start = Math.max(1, end - 4);
                  }
                }
                const pages = [];
                for (let i = start; i <= end; i++) {
                  pages.push(i);
                }
                return pages.map((pageNum) => (
                  <li
                    key={pageNum}
                    className={`page-item ${
                      reviewPage === pageNum ? "active" : ""
                    }`}>
                    <button
                      className='page-link'
                      onClick={() => setReviewPage(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                ));
              })()}
              {/* Next page button */}
              <li
                className={`page-item ${
                  reviewPage ===
                  Math.ceil((reviewData.total || 0) / reviewLimit)
                    ? "disabled"
                    : ""
                }`}>
                <button
                  className='page-link'
                  onClick={() => setReviewPage(reviewPage + 1)}
                  disabled={
                    reviewPage ===
                    Math.ceil((reviewData.total || 0) / reviewLimit)
                  }>
                  <i className='bi bi-chevron-double-right'></i>
                </button>
              </li>
              {/* Last page button */}
              <li
                className={`page-item ${
                  reviewPage ===
                  Math.ceil((reviewData.total || 0) / reviewLimit)
                    ? "disabled"
                    : ""
                }`}>
                <button
                  className='page-link'
                  onClick={() =>
                    setReviewPage(
                      Math.ceil((reviewData.total || 0) / reviewLimit)
                    )
                  }
                  disabled={
                    reviewPage ===
                    Math.ceil((reviewData.total || 0) / reviewLimit)
                  }>
                  <i className='bi bi-chevron-bar-right'></i>
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className='text-center py-4'>
          <p className='text-muted mb-0'>No reviews yet</p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
