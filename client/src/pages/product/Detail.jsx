import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
} from "../../../controller/api/admin/ApiProduct";
import Form from "./Form";
import FormReview from "./FormReview";
import Reviews from "./Reviews";
import Check from "./Check";

const createMarkup = (html) => {
  return { __html: html };
};

const Detail = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [reviewPage, setReviewPage] = React.useState(1);
  const reviewLimit = 10;
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useGetProductReviewsQuery({
    productId: id,
    page: reviewPage,
    limit: reviewLimit,
  });

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

  const renderRatingBar = (stars, count, totalReviews) => {
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return (
      <div className='d-flex align-items-center mb-2'>
        <div className='me-2' style={{ width: "60px" }}>
          {stars} stars
        </div>
        <div className='progress flex-grow-1' style={{ height: "8px" }}>
          <div
            className='progress-bar bg-warning'
            role='progressbar'
            style={{ width: `${percentage}%` }}
            aria-valuenow={percentage}
            aria-valuemin='0'
            aria-valuemax='100'></div>
        </div>
        <div className='ms-2' style={{ width: "40px" }}>
          {count}
        </div>
      </div>
    );
  };

  return (
    <div className='bg-light'>
      <title>{product?.name}</title>
      <meta name='description' content={product?.description} />
      <Navbar />
      <main className='container py-4' style={{ marginTop: 80 }}>
        <div className='row'>
          {/* Product Image - Always First on Mobile */}
          <div className='col-12 d-md-none mb-4'>
            <img
              src={product?.image}
              alt={product?.name}
              className='img-fluid rounded border border-2'
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Left Column: Image (Desktop) + Customer Reviews */}
          <div className='col-md-6 mb-4 order-md-1 order-3'>
            {/* Product Image - Desktop Only */}
            <div className='d-none d-md-block'>
              <img
                src={product?.image}
                alt={product?.name}
                className='img-fluid rounded border border-2 mb-4'
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            {/* Customer Reviews Summary */}
            <div className='mb-4'>
              <h4 className='mb-3'>Customer Reviews</h4>
              <div className='card mb-4'>
                <div className='card-body'>
                  <div className='row align-items-center'>
                    <div className='col-md-4 text-center'>
                      <h2 className='display-4 mb-0'>
                        {Number(product?.rating).toFixed(1)}
                      </h2>
                      <div className='mb-2'>{renderStars(product?.rating)}</div>
                      <p className='text-muted mb-0'>
                        {product?.reviewcount} reviews
                      </p>
                    </div>
                    <div className='col-md-8'>
                      <div className='rating-breakdown'>
                        {renderRatingBar(
                          5,
                          product?.ratingBreakdown[5],
                          product?.reviewCount || product?.reviewcount || 0
                        )}
                        {renderRatingBar(
                          4,
                          product?.ratingBreakdown[4],
                          product?.reviewCount || product?.reviewcount || 0
                        )}
                        {renderRatingBar(
                          3,
                          product?.ratingBreakdown[3],
                          product?.reviewCount || product?.reviewcount || 0
                        )}
                        {renderRatingBar(
                          2,
                          product?.ratingBreakdown[2],
                          product?.reviewCount || product?.reviewcount || 0
                        )}
                        {renderRatingBar(
                          1,
                          product?.ratingBreakdown[1],
                          product?.reviewCount || product?.reviewcount || 0
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews with Pagination */}
              <Reviews
                isReviewLoading={isReviewLoading}
                reviewData={reviewData}
                reviewPage={reviewPage}
                setReviewPage={setReviewPage}
                reviewLimit={reviewLimit}
              />
            </div>
          </div>

          {/* Right Column: Info, Features, Buy, Write Review */}
          <div className='col-md-6 bg-white p-4 rounded-3 border border-2 order-md-2 order-2'>
            <h1 className='mb-3'>{product?.name}</h1>
            <h2 className='text-primary mb-4'>
              Rp {parseFloat(product?.price).toLocaleString("id-ID")}
            </h2>

            <div className='d-flex align-items-center mb-3'>
              <div className='me-2'>{renderStars(product?.rating)}</div>
              <span className='me-2'>{Number(product?.rating).toFixed(1)}</span>
              <span className='text-muted'>
                ({product?.reviewcount} reviews)
              </span>
            </div>

            <div className='text-success mb-4'>
              <i className='bi bi-graph-up-arrow me-1'></i>
              {Number(product?.totalsales + 240).toLocaleString("id-ID")} sold
            </div>

            <div
              className='text-muted mb-4'
              dangerouslySetInnerHTML={createMarkup(product?.description)}
            />

            <div className='mb-4'>
              <h4>Key Features</h4>
              <ul className='list-unstyled'>
                {product?.features?.map((feature, index) => (
                  <li key={index} className='mb-2'>
                    <i className='bi bi-check-circle-fill text-success me-2'></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className='d-grid gap-2 mb-4'>
              <button
                data-bs-toggle='modal'
                data-bs-target='#order'
                className='btn btn-success btn-lg'>
                Buy Now
              </button>

              <button
                className='btn btn-outline-warning btn-lg'
                data-bs-toggle='modal'
                data-bs-target='#checkPayment'>
                Check Payment
              </button>
            </div>

            <FormReview />
          </div>
        </div>
      </main>
      <Form product={product} />
      <Check />
      <Footer />
    </div>
  );
};

export default Detail;
