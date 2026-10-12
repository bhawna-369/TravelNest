import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { tripSchema } from "./Validation";

function TripForm({ setTripData }) {
  return (
    <>
      <h2 className="mb-4 text-center fw-bold text-primary">Plan Your Trip</h2>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          destination: "",
          travelDate: "",
          returnDate: "",
          travelers: "",
          budget: "",
          hotelType: "",
          transport: "",
          specialRequests: "",
        }}
        validationSchema={tripSchema}
        onSubmit={(values) => {
          setTripData(values);
        }}
      >
        {() => (
          <Form>
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-semibold">
                Full Name
              </label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                className="form-control"
                placeholder="Enter your full name"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Destination */}
            <div className="mb-3">
              <label htmlFor="destination" className="form-label fw-semibold">
                Destination
              </label>
              <Field
                id="destination"
                name="destination"
                type="text"
                className="form-control"
                placeholder="Enter destination"
              />
              <ErrorMessage
                name="destination"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Travel Date */}
            <div className="mb-3">
              <label htmlFor="travelDate" className="form-label fw-semibold">
                Travel Date
              </label>
              <Field
                id="travelDate"
                name="travelDate"
                type="date"
                className="form-control"
              />
              <ErrorMessage
                name="travelDate"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Return Date */}
            <div className="mb-3">
              <label htmlFor="returnDate" className="form-label fw-semibold">
                Return Date
              </label>
              <Field
                id="returnDate"
                name="returnDate"
                type="date"
                className="form-control"
              />
              <ErrorMessage
                name="returnDate"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Number of Travelers */}
            <div className="mb-3">
              <label htmlFor="travelers" className="form-label fw-semibold">
                Number of Travelers
              </label>
              <Field
                id="travelers"
                name="travelers"
                type="number"
                className="form-control"
                placeholder="Enter number of travelers"
              />
              <ErrorMessage
                name="travelers"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Budget */}
            <div className="mb-3">
              <label htmlFor="budget" className="form-label fw-semibold">
                Budget
              </label>
              <Field
                id="budget"
                name="budget"
                type="number"
                className="form-control"
                placeholder="Enter budget"
              />
              <ErrorMessage
                name="budget"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Hotel Type */}
            <div className="mb-3">
              <label htmlFor="hotelType" className="form-label fw-semibold">
                Hotel Type
              </label>
              <Field
                as="select"
                id="hotelType"
                name="hotelType"
                className="form-select"
              >
                <option value="">Select hotel type</option>
                <option value="budget">Budget</option>
                <option value="standard">Standard</option>
                <option value="luxury">Luxury</option>
              </Field>
              <ErrorMessage
                name="hotelType"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Transport */}
            <div className="mb-3">
              <label htmlFor="transport" className="form-label fw-semibold">
                Transport
              </label>
              <Field
                as="select"
                id="transport"
                name="transport"
                className="form-select"
              >
                <option value="">Select transport</option>
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="car">Car</option>
                <option value="bus">Bus</option>
              </Field>
              <ErrorMessage
                name="transport"
                component="div"
                className="form-text text-danger"
              />
            </div>

            {/* Special Requests */}
            <div className="mb-4">
              <label
                htmlFor="specialRequests"
                className="form-label fw-semibold"
              >
                Special Requests
              </label>
              <Field
                as="textarea"
                id="specialRequests"
                name="specialRequests"
                className="form-control"
                placeholder="Any special requests? (max 200 characters)"
                maxLength={200}
                rows={3}
              />
              <ErrorMessage
                name="specialRequests"
                component="div"
                className="form-text text-danger"
              />
            </div>
 <button type="submit" className="btn btn-primary w-100 py-3 fw-semibold">
              Submit Trip
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default TripForm;

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const TripSchema = Yup.object({
//   name: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .required("Name is required"),

//   destination: Yup.string()
//     .required("Destination is required"),

//   startDate: Yup.date()
//     .required("Start date is required"),

//   endDate: Yup.date()
//     .required("End date is required"),

//   travelers: Yup.number()
//     .min(1, "Minimum 1 traveler")
//     .required("Number of travelers is required"),

//   budget: Yup.number()
//     .required("Budget is required"),
// });

// function TripForm({ setTripData }) {

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">
//         Plan Your Trip
//       </h2>

//       <Formik
//         initialValues={{
//           name: "",
//           destination: "",
//           startDate: "",
//           endDate: "",
//           travelers: "",
//           budget: "",
//         }}

//         validationSchema={TripSchema}

//         onSubmit={(values) => {
//           setTripData(values);
//         }}
//       >

//       {() => (
//         <Form className="card p-4 shadow">

//           <label>Name</label>
//           <Field 
//             className="form-control"
//             name="name"
//             placeholder="Enter your name"
//           />
//           <ErrorMessage 
//             name="name" 
//             component="div" 
//             className="text-danger"
//           />


//           <label className="mt-3">Destination</label>
//           <Field 
//             className="form-control"
//             name="destination"
//             placeholder="Enter destination"
//           />
//           <ErrorMessage 
//             name="destination" 
//             component="div" 
//             className="text-danger"
//           />


//           <label className="mt-3">Start Date</label>
//           <Field 
//             type="date"
//             className="form-control"
//             name="startDate"
//           />
//           <ErrorMessage 
//             name="startDate" 
//             component="div" 
//             className="text-danger"
//           />


//           <label className="mt-3">End Date</label>
//           <Field 
//             type="date"
//             className="form-control"
//             name="endDate"
//           />
//           <ErrorMessage 
//             name="endDate" 
//             component="div" 
//             className="text-danger"
//           />


//           <label className="mt-3">Number of Travelers</label>
//           <Field 
//             type="number"
//             className="form-control"
//             name="travelers"
//             placeholder="Enter travelers"
//           />
//           <ErrorMessage 
//             name="travelers" 
//             component="div" 
//             className="text-danger"
//           />


//           <label className="mt-3">Budget</label>
//           <Field 
//             type="number"
//             className="form-control"
//             name="budget"
//             placeholder="Enter budget"
//           />
//           <ErrorMessage 
//             name="budget" 
//             component="div" 
//             className="text-danger"
//           />


//           <button 
//             type="submit" 
//             className="btn btn-primary mt-4"
//           >
//             Submit Trip
//           </button>

//         </Form>
//       )}

//       </Formik>
//     </div>
//   );
// }

// export default TripForm;