import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from '../../assets/travelnest-logo.png';
import "./Navbar1.css";

export const Navbar1 = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar sticky-top py-3">
      <Container>
        {/* Modernized & Prominent Brand Logo Area */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 brand-wrapper me-4">
          <img
            src={logo}
            alt="TravelNest Logo"
            className="navbar-logo-img"
          />
          <span className="navbar-brand-text">
            Travel<span>Nest</span>
          </span>
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        {/* Collapsible Content */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto gap-1 gap-lg-2 my-3 my-lg-0">
            <Nav.Link as={Link} to="/" className={`nav-custom-link ${isActive("/") ? "active" : ""}`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Blog" className={`nav-custom-link ${isActive("/Blog") ? "active" : ""}`}>
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/Destination" className={`nav-custom-link ${isActive("/Destination") ? "active" : ""}`}>
              Destination
            </Nav.Link>
            <Nav.Link as={Link} to="/Plantrip" className={`nav-custom-link ${isActive("/Plantrip") ? "active" : ""}`}>
              Plan Trip
            </Nav.Link>
            <Nav.Link as={Link} to="/Review" className={`nav-custom-link ${isActive("/Review") ? "active" : ""}`}>
              Review
            </Nav.Link>
            <Nav.Link as={Link} to="/Contact" className={`nav-custom-link ${isActive("/Contact") ? "active" : ""}`}>
              Contact
            </Nav.Link>
          </Nav>

          {/* Action CTA Button */}
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/Login" className="p-0 mt-2 mt-lg-0 w-100">
              <Button className="btn-login-pill w-100 px-4 py-2 rounded-pill fw-bold border-0 shadow-sm">
                Login
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};