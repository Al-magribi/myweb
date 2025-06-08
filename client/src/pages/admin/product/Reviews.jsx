import React, { useState, useEffect } from "react";
import { useGetProductReviewsQuery } from "../../../controller/api/product/ApiProduct";

const Reviews = ({ id }) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useGetProductReviewsQuery(
    {
      productId: id,
      page,
      limit,
    },
    { skip: !id }
  );

  const handleClose = () => {
    const closeModal = document.querySelector("[data-bs-dismiss='modal']");
    if (closeModal) {
      closeModal.click();
    }
  };

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

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div
      className='modal fade'
      id='reviews'
      data-bs-backdrop='static'
      tabIndex='-1'
    >
      <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5'>Product's Reviews</h1>
            <button
              type='button'
              className='btn-close'
              onClick={handleClose}
              aria-label='Close'
              data-bs-dismiss='modal'
            ></button>
          </div>

          <div className='modal-body'>
            {isLoading ? (
              <div className='text-center py-4'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
            ) : data && data.reviews.length > 0 ? (
              <>
                {data.reviews.map((review) => (
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
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button
                        className='page-link'
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                      >
                        <i className='bi bi-chevron-bar-left'></i>
                      </button>
                    </li>
                    {/* Previous page button */}
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button
                        className='page-link'
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        <i className='bi bi-chevron-double-left'></i>
                      </button>
                    </li>
                    {/* Numbered page buttons (max 5) */}
                    {(() => {
                      let start = Math.max(1, page - 2);
                      let end = Math.min(totalPages, page + 2);
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
                            page === pageNum ? "active" : ""
                          }`}
                        >
                          <button
                            className='page-link'
                            onClick={() => setPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        </li>
                      ));
                    })()}
                    {/* Next page button */}
                    <li
                      className={`page-item ${
                        page === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                      >
                        <i className='bi bi-chevron-double-right'></i>
                      </button>
                    </li>
                    {/* Last page button */}
                    <li
                      className={`page-item ${
                        page === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => setPage(totalPages)}
                        disabled={page === totalPages}
                      >
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
          <div className='modal-footer'>
            <button
              className='btn btn-sm btn-outline-secondary'
              onClick={handleClose}
              data-bs-dismiss='modal'
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
