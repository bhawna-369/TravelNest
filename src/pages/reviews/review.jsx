import React, { useState, useEffect } from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReviewSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
  rating: Yup.number().min(1, 'Please select a rating').max(5).required(),
  review: Yup.string().trim().min(5, 'Review must be at least 5 characters').required('Review body is required'),
});

const Review = () => {
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem('reviews');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReview = (values, { resetForm }) => {
    const newReview = {
      id: Date.now(),
      name: values.name,
      review: values.review,
      rating: parseInt(values.rating, 10),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
    };

    setReviews([newReview, ...reviews]);
    resetForm();
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(rev => rev.id !== id));
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div
          className="mb-5 position-relative"
          style={{
            height: '280px',
            backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }}
        >
          <div
            className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center position-absolute top-0 start-0"
            style={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(2px)'
            }}
          >
            <h1 className="text-white fw-bold display-5 mb-2 text-uppercase tracking-wide">
              Community Reviews
            </h1>
            <p className="text-white text-opacity-75 fs-5 fw-light tracking-widest">
              Explore The World With TravelNest
            </p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '24px', zIndex: 10 }}>
              <h4 className="fw-bold text-dark mb-4">Write a Review</h4>
              
              <Formik
                initialValues={{ name: '', rating: '', review: '' }}
                validationSchema={ReviewSchema}
                onSubmit={handleAddReview}
              >
                {({ errors, touched }) => (
                  <FormikForm>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-muted">Your Name</label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        className={`form-control rounded-3 py-2 ${touched.name && errors.name ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback small" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-muted">Rating Status</label>
                      <Field
                        as="select"
                        name="rating"
                        className={`form-select rounded-3 py-2 ${touched.rating && errors.rating ? 'is-invalid' : ''}`}
                      >
                        <option value="">Choose Star Rating...</option>
                        <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
                        <option value="4">⭐⭐⭐⭐ Great (4)</option>
                        <option value="3">⭐⭐⭐ Average (3)</option>
                        <option value="2">⭐⭐ Poor (2)</option>
                        <option value="1">⭐ Terrible (1)</option>
                      </Field>
                      <ErrorMessage name="rating" component="div" className="invalid-feedback small" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label small fw-semibold text-muted">Share Details</label>
                      <Field
                        name="review"
                        as="textarea"
                        rows="4"
                        placeholder="Tell us about your trip packages, hotels, guides..."
                        className={`form-control rounded-3 ${touched.review && errors.review ? 'is-invalid' : ''}`}
                      />
                      <ErrorMessage name="review" component="div" className="invalid-feedback small" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-3 py-2.5 fw-bold shadow-sm">
                      Submit Review
                    </button>
                  </FormikForm>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="fw-bold text-dark mb-0">Guest Feedback ({reviews.length})</h4>
            </div>

            {reviews.length === 0 ? (
              <div className="card border-0 shadow-sm rounded-4 text-center py-5 bg-white">
                <div className="card-body py-5 text-muted">
                  <span className="fs-1 d-block mb-3">💬</span>
                  <h5 className="fw-bold text-dark">No reviews posted yet</h5>
                  <p className="small mb-0 text-secondary">Be the first to share your global experience with travelNest!</p>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-bold text-dark mb-0">{rev.name}</h6>
                          <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                            Posted on {rev.date}
                          </small>
                        </div>
                        <button 
                          type="button" 
                          className="btn-close opacity-50"
                          onClick={() => handleDeleteReview(rev.id)}
                          aria-label="Delete Review"
                          title="Delete Review"
                        ></button>
                      </div>
                      <div className="mb-3 d-flex gap-1">
                        {[...Array(5)].map((_, index) => (
                          <span 
                            key={index} 
                            className="fs-5"
                            style={{ 
                              color: index < rev.rating ? '#ffc107' : '#e2e8f0',
                              lineHeight: 1 
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <p className="card-text text-secondary mb-0" style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                        {rev.review}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Review;