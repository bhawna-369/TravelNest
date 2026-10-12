import React, { useState } from "react";
import TripForm from "../../component/TripSummary/tripForm";
import TripSummary from "../../component/TripSummary/TripSummary";

export const Plantrip = () => {
  const [tripData, setTripData] = useState(null);

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Immersive Hero Header */}
      <div 
        className="position-relative d-flex align-items-center justify-content-center text-white text-center shadow mb-5"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
          height: "380px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container px-4">
          <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill mb-3 tracking-wider fw-bold">
            Plan Your Next Getaway
          </span>
          <h1 className="display-3 fw-black text-white tracking-tight mb-2">
            Where to next?
          </h1>
          <p className="fs-5 text-white-50 mx-auto mb-0" style={{ maxWidth: "600px" }}>
            Fill out the details below to curate your perfect personalized itinerary.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            
            {!tripData ? (
              /* --- STATE A: THE FORM ENTRY UI --- */
              <div className="row g-4 align-items-stretch">
                {/* Left Side: Inspiration Panel */}
                <div className="col-12 col-lg-4 d-none d-lg-block">
                  <div 
                    className="card border-0 shadow-sm h-100 rounded-4 text-white p-4 d-flex flex-column justify-content-between position-relative overflow-hidden"
                    style={{
                      backgroundImage: "linear-gradient(to bottom, rgba(13, 110, 253, 0.85), rgba(10, 50, 120, 0.95))",
                    }}
                  >
                    <div>
                      <div className="bg-white bg-opacity-20 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "60px", height: "60px" }}>
                        <i className="bi bi-compass text-white" style={{ fontSize: "1.8rem" }}></i>
                      </div>
                      <h3 className="fw-bold lh-base">“Travel is the only thing you buy that makes you richer.”</h3>
                      <p className="text-white-50 small">— Anonymous</p>
                    </div>
                    
                    <div className="pt-4 border-top border-white-10">
                      <div className="d-flex align-items-center gap-2 small text-white-50">
                        <i className="bi bi-check-circle-fill text-warning"></i>
                        <span>Smart route optimization</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 small text-white-50 mt-2">
                        <i className="bi bi-check-circle-fill text-warning"></i>
                        <span>Budget-friendly suggestions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Clean Centered Form Card */}
                <div className="col-12 col-lg-8">
                  <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="card-header bg-white border-0 pt-4 px-4 px-sm-5 pb-0">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-primary-subtle p-2 rounded-3 text-primary">
                          <i className="bi bi-sliders2-vertical fs-5"></i>
                        </div>
                        <h2 className="fs-4 fw-bold text-dark m-0">Trip Configuration</h2>
                      </div>
                    </div>
                    <div className="card-body p-4 p-sm-5">
                      <TripForm setTripData={setTripData} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* --- STATE B: THE LIVE TRIP SUMMARY UI --- */
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden animate-fade-in">
                {/* Dashboard Control Bar */}
                <div className="card-header bg-dark text-white p-4 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-primary text-white p-3 rounded-3 shadow-sm d-flex align-items-center justify-content-center">
                      <i className="bi bi-airplane-engines fs-4"></i>
                    </div>
                    <div>
                      <h2 className="fs-4 fw-bold m-0">Your Generated Itinerary</h2>
                      <p className="small text-white-50 mb-0">Review, adjust, and finish preparing your journey</p>
                    </div>
                  </div>
                  
                  <button
                    className="btn btn-light rounded-pill px-4 fw-semibold shadow-sm align-self-start align-self-sm-center"
                    onClick={() => setTripData(null)}
                  >
                    <i className="bi bi-pencil-square me-2 text-primary"></i> Modify Configuration
                  </button>
                </div>

                {/* Main Rendered Summary Module */}
                <div className="card-body p-4 p-md-5 bg-white">
                  <TripSummary tripData={tripData} />
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};
// import React , {useState} from "react";
// import {TripForm} from  "../../component/TripSummary/Tripsummary"
// import {TripForm} from "../../component/TripSummary/tripForm"

// export const Plantrip = ()=>{
// const [tripData, setTripData] = useState(null);

//     return (
//         <>
//         <div className="position-relative text-white" style={{ height: "400px" }}>
//         <div
//           className="w-100 h-100"
//           style={{
//             backgroundImage:
//               "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIM2Pbwv3pqTKExmJtUiP5RXUPgKdNZim5t7TxWhx3hkOEyy4WdF7-AkA&s=10)",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             filter: "brightness(0.8)",
//           }}
//         >
//           <div
//             className="d-flex flex-column justify-content-center align-items-center h-100"
//             style={{
//               backgroundColor: "rgba(0,0,0,0.4)",
//             }}
//           >
//             <h1
//               className="display-4 text-center"
//               style={{
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
//                 fontWeight: "bold",
//               }}
//             >
//              Plan your trip
//             </h1>

//             <p className="fs-4">travelNest</p>
//           </div>
//         </div>
//       </div>
//        <div className="container mt-4">
//       <TripForm setTripData={setTripData} />
//       <TripSummary tripData={tripData} />
//     </div>
//         </>
//     )
// }
