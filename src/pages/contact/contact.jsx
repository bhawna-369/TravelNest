import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string().trim().min(2, "Name is too short").required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  message: Yup.string().trim().min(10, "Message must be at least 10 characters").required("Message is required"),
});

export const Contact = () => {
  const handleSubmit = (values, { resetForm }) => {
    alert(`Thank you, ${values.name}! Your message has been sent successfully.`);
    resetForm();
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div 
        className="mb-5 position-relative text-white" 
        style={{ 
          height: "350px",
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div 
          className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center position-absolute top-0 start-0"
          style={{ 
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(2px)"
          }}
        >
          <h1 className="display-4 fw-bold text-uppercase tracking-wide mb-2">Contact TravelNest</h1>
          <p className="fs-5 text-white text-opacity-75 fw-light tracking-widest">We're Here to Help You Explore the World</p>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center fw-bold mb-4 text-dark">Get in Touch</h2>
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white text-secondary">
              <span className="fs-2 mb-2 d-block text-primary">✉️</span>
              <strong className="text-dark d-block mb-1">Email Support</strong>
              <a href="mailto:support@travelnest.com" className="text-decoration-none text-muted small">
                support@travelnest.com
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white text-secondary">
              <span className="fs-2 mb-2 d-block text-primary">📞</span>
              <strong className="text-dark d-block mb-1">Phone Line</strong>
              <a href="tel:+11234567890" className="text-decoration-none text-muted small">
                +1 (123) 456-7890
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white text-secondary">
              <span className="fs-2 mb-2 d-block text-primary">📍</span>
              <strong className="text-dark d-block mb-1">Headquarters</strong>
              <span className="text-muted small">
                123 Travel Street, Adventure City, Country
              </span>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow rounded-4 p-4 p-md-5 bg-white">
              <h3 className="fw-bold mb-4 text-dark text-center text-md-start">Send Us a Message</h3>
              
              <Formik
                initialValues={{ name: "", email: "", message: "" }}
                validationSchema={ContactSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <FormikForm>
                    <div className="row g-3">
                      <div className="col-md-6 mb-2">
                        <label htmlFor="name" className="form-label small fw-semibold text-muted">
                          Your Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Rahul Sharma"
                          className={`form-control rounded-3 py-2 ${touched.name && errors.name ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="name" component="div" className="invalid-feedback small" />
                      </div>
                      <div className="col-md-6 mb-2">
                        <label htmlFor="email" className="form-label small fw-semibold text-muted">
                          Email Address
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          placeholder="rahul@example.com"
                          className={`form-control rounded-3 py-2 ${touched.email && errors.email ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback small" />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="message" className="form-label small fw-semibold text-muted">
                          Message Body
                        </label>
                        <Field
                          name="message"
                          component="textarea"
                          id="message"
                          rows="5"
                          placeholder="Write your questions or travel inquiries here..."
                          className={`form-control rounded-3 ${touched.message && errors.message ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage name="message" component="div" className="invalid-feedback small" />
                      </div>
                    </div>
                    <div className="text-center text-md-start mt-2">
                      <button type="submit" className="btn btn-primary px-4 py-2.5 rounded-3 fw-bold shadow-sm text-uppercase tracking-wider">
                        Send Message
                      </button>
                    </div>
                  </FormikForm>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};