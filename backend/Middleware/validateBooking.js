import { body, validationResult } from 'express-validator'; // Import express-validator for request validation
import Booking from '../Models/Booking';

export const validateBookingCreate = [
  body('facilityId')
    .notEmpty() // Validate that facilityId is not empty
    .withMessage('Facility ID is required'), // Custom error message for empty facilityId   
    body('userId')
    .notEmpty() // Validate that userId is not empty
    .withMessage('User ID is required'), // Custom error message for empty userId
  body('date')  
    .isISO8601() // Validate that date is in ISO 8601 format
    .withMessage('Invalid date format'), // Custom error message for invalid date format
  body('time')  
    .notEmpty() // Validate that time is not empty
    .withMessage('Time is required'), // Custom error message for empty time
  async (req, res, next) => { // Middleware function to handle validation results       
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }   
    next(); // Call the next middleware or route handler
  }                 
];

export const validateBookingUpdate = [
  body('facilityId')
    .optional() // Validate that facilityId is optional
    .notEmpty() // Validate that facilityId is not empty                
    .withMessage('Facility ID is required'), // Custom error message for empty facilityId           
    body('userId')   
    .optional() // Validate that userId is optional   
    .notEmpty() // Validate that userId is not empty
    .withMessage('User ID is required'), // Custom error message for empty userId
  body('date')
    .optional() // Validate that date is optional
    .isISO8601() // Validate that date is in ISO 8601 format
    .withMessage('Invalid date format'), // Custom error message for invalid date format
  body('time')  
    .optional() // Validate that time is optional
    .notEmpty() // Validate that time is not empty          
    .withMessage('Time is required'), // Custom error message for empty time   
    (req, res, next) => { // Middleware function to handle validation results
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) { // If there are validation errors
            return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
        }   
        next(); // Call the next middleware or route handler
    }    
];


export const validateBookingDelete = async (req, res, next) => {
  const { id } = req.params;            
    try {       
    const deletedBooking = await Booking.findByIdAndDelete(id); // Find the booking by ID and delete it         
    if (!deletedBooking) { // If booking is not found
      return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message
    }   
    res.status(200).json({ message: 'Booking deleted successfully' }); // Respond with a success message
  }
    catch (error) {
    console.error('❌ Error deleting booking:', error);         
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }     
    next(); // Call the next middleware or route handler
}

export const validateBookingRequest = (req, res, next) => { // Middleware function to validate request data
  const errors = validationResult(req); // Check for validation errors  
    if (!errors.isEmpty()) { // If there are validation errors  
        return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors    
    }
    next(); // Call the next middleware or route handler
}   



