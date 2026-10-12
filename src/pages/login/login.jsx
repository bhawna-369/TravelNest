import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const Login = () => {
  const handleLoginSubmit = (values, { resetForm }) => {
    alert(`🎉 Login Successful! Welcome back to TravelNest, ${values.username}!`);
    resetForm();
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
      style={{
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(0, 149, 255, 0.05) 0%, rgba(0, 0, 0, 0) 90%)"
      }}
    >
      <div className="w-100 px-3" style={{ maxWidth: "420px" }}>
        <Card className="border-0 shadow rounded-4 overflow-hidden p-4 p-md-5 bg-white">
          <Card.Body className="p-0">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-1 tracking-wide">travelNest</h2>
              <p className="text-muted small">Please sign in to access your dashboard</p>
            </div>

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <FormikForm>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label className="small fw-semibold text-muted">Username</Form.Label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="e.g. rahul_sharma"
                      className={`form-control rounded-3 py-2 ${touched.username && errors.username ? "is-invalid" : ""}`}
                    />
                    <ErrorMessage name="username" component="div" className="invalid-feedback small" />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="small fw-semibold text-muted">Password</Form.Label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className={`form-control rounded-3 py-2 ${touched.password && errors.password ? "is-invalid" : ""}`}
                    />
                    <ErrorMessage name="password" component="div" className="invalid-feedback small" />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-100 rounded-3 py-2.5 fw-bold text-uppercase tracking-wider shadow-sm mt-2"
                  >
                    {isSubmitting ? "Signing In..." : "Login"}
                  </Button>
                </FormikForm>
              )}
            </Formik>
            
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};