import React from "react";

const TripSummary = ({ tripData }) => {
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Trip Summary</h3>
        </div>
        <div className="card-body">
          {tripData ? (
            <>
              <p><b>Name:</b> {tripData.fullName}</p>
              <p><b>Email:</b> {tripData.email}</p>
              <p><b>Destination:</b> {tripData.destination}</p>
              <p><b>Start Date:</b> {tripData.travelDate}</p>
              <p><b>End Date:</b> {tripData.returnDate}</p>
              <p><b>Travelers:</b> {tripData.travelers}</p>
              <p><b>Budget:</b> ₹{tripData.budget}</p>
            </>
          ) : (
            <h5 className="text-muted">
              No trip details available
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripSummary;


// import React from "react";

// const TripSummary = ({ tripData }) => {
//   return (
//     <div className="container mt-4">
//       <div className="card shadow">
//         <div className="card-header bg-primary text-white">
//           <h3 className="mb-0">Trip Summary</h3>
//         </div>

//         <div className="card-body">
//           {tripData ? (
//             <>
//               <p><b>Name:</b> {tripData.name}</p>
//               <p><b>Email:</b> {tripData.email}</p>
//               <p><b>Destination:</b> {tripData.destination}</p>
//               <p><b>Start Date:</b> {tripData.startDate}</p>
//               <p><b>End Date:</b> {tripData.endDate}</p>
//               <p><b>Travelers:</b> {tripData.travelers}</p>
//               <p><b>Budget:</b> ₹{tripData.budget}</p>
//             </>
//           ) : (
//             <h5 className="text-muted">
//               No trip details available
//             </h5>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TripSummary;