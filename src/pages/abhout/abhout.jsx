import React from "react";   

export const About = () => {
  const values = [
    { icon: "🌍", title: "Global Reach", text: "We connect you to thousands of curate getaways across 100+ nations smoothly." },
    { icon: "🛡️", title: "Safe & Trusted", text: "Verified local stay partners, safe payment processors, and 24/7 on-trip assistance." },
    { icon: "💎", title: "Affordable Luxury", text: "Specially calibrated pricing models tailored to balance your budget parameters perfectly." }
  ];

  const team = [
    { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300", name: "Ananya Sharma", role: "Founder & Chief Explorer" },
    { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300", name: "Vikram Malhotra", role: "Head of Operations" },
    { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300", name: "Priya Nair", role: "Lead Travel Curator" }
  ];

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div 
  className="mb-5 position-relative text-white" 
  style={{ 
    height: "400px",
    // Clean & High-Resolution Travel Image
    backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
      {/* <div 
        className="mb-5 position-relative text-white" 
        style={{ 
          height: "400px",
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp_cVh1C0axorSKatllqjt6EtCI_Klu6YK9dXhfuIkarvGgjJ6x2F-SMsN&s=10')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      > */}
        <div 
          className="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center position-absolute top-0 start-0"
          style={{ 
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(2px)"
          }}
        >
          <span className="text-uppercase tracking-widest fw-bold text-primary small mb-2">Our Story</span>
          <h1 className="display-3 fw-bold text-uppercase tracking-wide mb-2">About travelNest</h1>
          <p className="fs-5 text-white text-opacity-75 fw-light tracking-widest" style={{ maxWidth: "600px" }}>
            Redefining the mechanics of global discovery, one perfectly nested journey at a time.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row align-items-center g-5 mb-5 py-3">
          <div className="col-lg-6">
            <h2 className="fw-bold text-dark mb-3">Making Travel Approachable, Seamless, & Memorable</h2>
            <p className="text-secondary mb-3" style={{ lineHeight: "1.7" }}>
              Founded with the vision to strip anxiety away from vacation routing, <strong>travelNest</strong> serves as your digital companion. We bundle transparent filter parameters, organic user feedback reviews, and premium hand-picked destinations onto a unified application framework.
            </p>
            <p className="text-secondary mb-0" style={{ lineHeight: "1.7" }}>
              Whether you are hunting for budget backpacking trails under ₹10,000 or looking to unlock super luxury escapes, our platform actively indexes packages built exclusively around your terms.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80" 
                alt="Travel map layout" 
                className="img-fluid rounded-4 shadow"
                style={{ objectFit: "cover", height: "350px", width: "100%" }}
              />
            </div>
          </div>
        </div>

        <hr className="my-5 border-secondary-subtle" />

        <h3 className="text-center fw-bold text-dark mb-4">Why Global Citizens Choose Us</h3>
        <div className="row g-4 mb-5">
          {values.map((val, i) => (
            <div className="col-md-4" key={i}>
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white">
                <span className="fs-1 mb-2 d-block">{val.icon}</span>
                <h5 className="fw-bold text-dark mb-2">{val.title}</h5>
                <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>{val.text}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-5 border-secondary-subtle" />

        {/* Dynamic Executive Team Row */}
        <h3 className="text-center fw-bold text-dark mb-2">Meet the Innovators</h3>
        <p className="text-center text-muted small mb-5">The adventurous minds driving travelNest forward</p>
        
        <div className="row g-4 justify-content-center">
          {team.map((member, idx) => (
            <div className="col-md-4 col-sm-6 max-width-320" key={idx}>
              <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden h-100 text-center">
                <div style={{ height: "260px" }} className="bg-light">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-100 h-100" 
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                </div>
                <div className="card-body p-3">
                  <h6 className="fw-bold text-dark mb-1">{member.name}</h6>
                  <small className="text-primary fw-medium text-uppercase tracking-wider d-block" style={{ fontSize: "11px" }}>
                    {member.role}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};