import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAddReviewMutation } from "../../../controller/api/admin/ApiProduct";
import { useParams } from "react-router-dom";

const FormReview = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productId: id,
    name: "",
    email: "",
    rating: 0,
    reviewComment: "",
  });

  const [errors, setErrors] = useState({});
  const [addReview, { isLoading, isSuccess, isError, reset }] =
    useAddReviewMutation();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.rating) {
      newErrors.rating = "Please select a rating";
    }
    if (!formData.reviewComment.trim()) {
      newErrors.reviewComment = "Review comment is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
    if (errors.rating) {
      setErrors({ ...errors, rating: "" });
    }
  };

  const resetForm = () => {
    setFormData({
      productId: id,
      name: "",
      email: "",
      rating: 0,
      reviewComment: "",
    });
    setErrors({});
    reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    toast.promise(
      addReview(formData)
        .unwrap()
        .then((res) => res.message),
      {
        loading: "Submitting review...",
        success: (message) => message,
        error: (error) => error.data.message,
      }
    );
  };

  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }

    if (isError) {
      reset();
    }
  }, [isSuccess, isError]);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title mb-3'>Write a Review</h5>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Rating</label>
            <div className='rating-select'>
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi ${
                    star <= formData.rating ? "bi-star-fill" : "bi-star"
                  } fs-4 me-2 text-warning`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
            {errors.rating && (
              <div className='text-danger mt-1'>{errors.rating}</div>
            )}
          </div>

          <div className='form-floating mb-3'>
            <input
              type='text'
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id='name'
              placeholder='Enter your name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor='name'>Your Name</label>
            {errors.name && (
              <div className='invalid-feedback'>{errors.name}</div>
            )}
          </div>

          <div className='form-floating mb-3'>
            <input
              type='email'
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id='email'
              placeholder='Enter your email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor='email'>Your Email</label>
            {errors.email && (
              <div className='invalid-feedback'>{errors.email}</div>
            )}
          </div>

          <div className='form-floating mb-3'>
            <textarea
              className={`form-control ${
                errors.reviewComment ? "is-invalid" : ""
              }`}
              id='reviewComment'
              rows='3'
              name='reviewComment'
              placeholder='Write your review here...'
              value={formData.reviewComment}
              onChange={handleChange}
            />
            <label htmlFor='reviewComment'>Your Review</label>
            {errors.reviewComment && (
              <div className='invalid-feedback'>{errors.reviewComment}</div>
            )}
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormReview;
