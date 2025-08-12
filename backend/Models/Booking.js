import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { //stores the user who made the booking, linked to the User model.
    type: mongoose.Schema.Types.ObjectId,   // Reference to the User model      
    ref: "User", // Reference to the User model
    required: true // User is required for a booking
  },    
    facility: { //stores the facility being booked, linked to the Facility model
    type: mongoose.Schema.Types.ObjectId, // Reference to the Facility model
    ref: "Facility", // Reference to the Facility model
    required: true // Facility is required for a booking        
    },      
    date: {    // Date of the booking, when the user wants to book the facility 
    type: Date, // Date of the booking
    required: true // Date is required for a booking
  },    
    timeSlot: { // Time slot for the booking, from when to when the facility is booked    
    type: String, // Time slot as a string (e.g., "10:00 AM - 11:00 AM")
    required: true // Time slot is required for a booking
  },        
    status: { // Status of the booking. is it confirmed, pending, or cancelled?
    type: String, // Status as a string (e.g., "confirmed", "pending", "cancelled")
    enum: ["confirmed", "pending", "cancelled"], // Allowed values for status
    default: "pending" // Default status is pending     
    },  
    createdAt: { // Timestamp for when the booking was created. 
    type: Date, // Type is Date
    default: Date.now // Default value is the current date and time
  },        
    updatedAt: { // Timestamp for when the booking was last updated 
    type: Date, // Type is Date
    default: Date.now // Default value is the current date and time
  }
});     
const Booking = mongoose.model('Booking', bookingSchema); // Create the Booking model from the schema
export default Booking; // Export the Booking model for use in other parts of the application
// export { bookingSchema }; // Export the schema if needed for further customization or validation
// export { Booking }; // Export the Booking model for use in other parts of the application    