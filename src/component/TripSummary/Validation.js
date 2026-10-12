import * as Yup from "yup";

export const tripSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Minimum 3 characters required")
    .required("Full Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  destination: Yup.string()
    .required("Please select destination"),

  travelDate: Yup.date()
    .required("Travel Date is required"),

  returnDate: Yup.date()
    .min(
      Yup.ref("travelDate"),
      "Return Date must be after Travel Date"
    )
    .required("Return Date is required"),

  travelers: Yup.number()
    .min(1, "Minimum 1 traveler")
    .required("Number of travelers is required"),

  budget: Yup.number()
    .required("Budget is required"),

  hotelType: Yup.string()
    .required("Please select hotel type"),

  transport: Yup.string()
    .required("Please select transport"),

  specialRequests: Yup.string()
    .max(200, "Maximum 200 characters"),
});

// import * as Yup from "yup";

// export const tripSchema = Yup.object({

//   fullName: Yup.string()
//     .min(3, "Minimum 3 characters required")
//     .required("Full Name is required"),

//   email: Yup.string()
//     .email("Invalid email")
//     .required("Email is required"),

//   destination: Yup.string()
//     .required("Please select destination"),

//   travellers: Yup.string()
//     .required("Please select number of travellers"),

//   budget: Yup.string()
//     .required("Please select budget"),

//   travelDate: Yup.date()
//     .required("Travel Date is required"),

//   returnDate: Yup.date()
//     .min(
//       Yup.ref("travelDate"),
//       "Return Date must be after Travel Date"
//     )
//     .required("Return Date is required"),

//   hotelType: Yup.string()
//     .required("Please select hotel type"),

//   transport: Yup.string()
//     .required("Please select transport"),

//   specialRequests: Yup.string()
//     .max(200, "Maximum 200 characters"),
// });