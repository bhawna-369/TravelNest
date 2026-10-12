import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="travelnest-footer text-light pt-5 pb-4">
      <div className="container">
        <div className="row g-4">
          
          {/* Brand Vision */}
          <div className="col-lg-4 col-md-6">
            <h3 className="brand-logo mb-3">
              Travel<span>Nest</span>
            </h3>
            <p className="vision-line mb-4 text-secondary">
              "Connecting travelers to their perfect home away from home, ensuring every journey feels like a homecoming."
            </p>
            <div className="d-flex gap-2 justify-content-start social-links-container">
              <a href="#" className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="footer-heading mb-4 text-uppercase fw-bold text-white small tracking-wider">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/blog">Travel Blog</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading mb-4 text-uppercase fw-bold text-white small tracking-wider">Contact Us</h5>
            <div className="contact-info text-secondary d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-2 contact-item">
                <i className="bi bi-telephone-fill text-primary"></i>
                <span>+92 300 0000000</span>
              </div>
              <div className="d-flex align-items-center gap-2 contact-item">
                <i className="bi bi-envelope-fill text-primary"></i>
                <span>hello@travelnest.com</span>
              </div>
              <div className="d-flex align-items-start gap-2 contact-item">
                <i className="bi bi-geo-alt-fill text-primary mt-1"></i>
                <span>123 Main Street, YNR, India</span>
              </div>
            </div>
          </div>

          {/* Modernized Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-heading mb-4 text-uppercase fw-bold text-white small tracking-wider">Stay Updated</h5>
            <p className="small text-secondary mb-3">Subscribe to get travel tips and exclusive nest deals.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group overflow-hidden rounded-3 p-1 bg-dark-subtle border border-secondary border-opacity-25">
                <input 
                  type="email" 
                  className="form-control bg-transparent text-white border-0 py-2 shadow-none" 
                  placeholder="Your Email" 
                  aria-label="Email address"
                  required
                />
                <button className="btn btn-primary rounded-3 px-3 fw-semibold" type="submit">
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Sub-Footer Base */}
        <div className="row mt-5 pt-4 border-top border-secondary border-opacity-25 align-items-center">
          <div className="col-md-7 text-center text-md-start">
            <p className="mb-0 text-secondary small">
              &copy; {currentYear} <span className="text-white fw-medium">TravelNest</span>. All rights reserved.
            </p>
          </div>
          <div className="col-md-5 text-center text-md-end mt-3 mt-md-0">
            <ul className="list-inline mb-0 footer-secondary-links">
              <li className="list-inline-item mx-2"><a href="/privacy">Privacy Policy</a></li>
              <li className="list-inline-item mx-2"><a href="/terms">Terms of Use</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


// import React from 'react';
// import './Footer.css'; // Custom CSS file

// function Footer() {
//   return (
//     <footer className="footer bg-dark text-white pt-4">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-3 mb-3">
//             <h5>About Us</h5>
//             <p></p>
//           </div>
//           <div className="col-md-3 mb-3">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-white">Home</a></li>
//               <li><a href="#" className="text-white">Services</a></li>
//               <li><a href="#" className="text-white">About</a></li>
//               <li><a href="#" className="text-white">Contact</a></li>
//             </ul>
//           </div>
//           <div className="col-md-3 mb-3">
//             <h5>Contact Us</h5>
//             <p>Phone: +92 300 ******</p>
//             <p>Email: info@travelnest.com</p>
//             <p>Address: 123 Main Street, ynr, india</p>
//           </div>
//           <div className="col-md-3 mb-3">
//             <h5>Follow Us</h5>
//             <a href="#" className="text-white me-3">Facebook</a>
//             <a href="#" className="text-white me-3">Twitter</a>
//             <a href="#" className="text-white">Instagram</a>
//           </div>
//         </div>
//         <div className="text-center mt-3 pt-3 border-top border-secondary">
//           <p>&copy; 2024 Your Company. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;