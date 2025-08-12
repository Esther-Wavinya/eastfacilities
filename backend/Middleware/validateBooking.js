import { body, validationResult } from 'express-validator'; // Import express-validator for request validation
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation and verification
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing


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
    try {
      const { facilityId, userId, date, time } = req.body;  // Destructure the request body to get facilityId, userId, date, and time   
        const newBooking = new Booking({ facilityId, userId, date, time }); // Create a new Booking instance        
        await newBooking.save(); // Save the new booking to the database        
        res.status(201).json({ message: 'Booking created successfully' }); // Respond with a 201 status code and a success message          
    } catch (error) {
      console.error('❌ Error creating booking:', error);           
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message        
    }
    next(); // Call the next middleware or route handler
  }                 
];

export const validateBookingUpdate = [
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
    try {       
        const { id } = req.params; // Get the booking ID from the request parameters    
        const { facilityId, userId, date, time } = req.body; // Destructure the request body to get facilityId, userId, date, and time      
        const updateData = {}; // Create an object to hold the update data
        if (facilityId) updateData.facilityId = facilityId; // If facilityId is provided, add it to the update data     
        if (userId) updateData.userId = userId; // If userId is provided, add it to the update data     
        if (date) updateData.date = date; // If date is provided, add it to the update data
        if (time) updateData.time = time;       // If time is provided, add it to the update data           
        const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true }); // Update the booking by ID and return the updated booking
      if (!updatedBooking) { // If booking is not found
        return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message
      }             
        req.booking = updatedBooking; // Attach the updated booking details to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {                       
        console.error('❌ Error updating booking:', error); // Log the error to the console         
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
    }   
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





