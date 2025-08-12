import express from 'express';
import Booking from '../Models/Booking';
import { body, validationResult } from 'express-validator'; // Import express-validator for request validation

const router = express.Router(); // Create a new router instance    


// GET route to fetch all bookings
router.get('/', async (req, res) => {
  try { // Fetch all bookings from the database 
    const bookings = await Booking.find(); // Find all bookings in the database
    res.status(200).json(bookings); // Respond with the list of bookings
  }
    catch (error) { 
    console.error('❌ Error fetching bookings:', error); // Log the error to the console
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }
});


// GET route to fetch a booking by ID   
router.get('/:id', async (req, res) => {
  const { id } = req.params;    
    try { // Fetch a booking by ID from the database
    const booking = await Booking.findById(id); // Find the booking by ID
    if (!booking) { // If booking is not found
      return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message
    }   
    res.status(200).json(booking); // Respond with the booking details
  }
    catch (error) { 
    console.error('❌ Error fetching booking:', error); // Log the error to the console     
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }         
});


// POST route to create a new booking
router.post('/',
  [     
    body('userId').notEmpty().withMessage('User ID is required'), // Validate that userId is not empty
    body('facilityId').notEmpty().withMessage('Facility ID is required'), // Validate that facilityId is not empty
    body('date').isISO8601().withMessage('Invalid date format'), // Validate that date is in ISO 8601 format            
    body('time').notEmpty().withMessage('Time is required') // Validate that time is not empty
  ],
    async (req, res) => {   
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }
    try {
      const { userId, facilityId, date, time } = req.body;
        const newBooking = new Booking({ userId, facilityId, date, time }); // Create a new Booking instance    
        await newBooking.save(); // Save the new booking to the database
        res.status(201).json({ message: 'Booking created successfully' }); // Respond with a 201 status code and a success message  
    } catch (error) {
      console.error('❌ Error creating booking:', error);       
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message    
    }
  });



// PUT route to update a booking by ID
router.put('/:id',
  [ 
    body('userId').optional().notEmpty().withMessage('User ID cannot be empty'), // Validate that userId is not empty if provided       
    body('facilityId').optional().notEmpty().withMessage('Facility ID cannot be empty'), // Validate that facilityId is not empty if provided
    body('date').optional().isISO8601().withMessage('Invalid date format'), // Validate that date is in ISO 8601 format if provided
    body('time').optional().notEmpty().withMessage('Time cannot be empty') // Validate that time is not empty if provided       
    ],      
    async (req, res) => {   
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }       
    try {
      const { id } = req.params; // Get the booking ID from the request parameters
      const { userId, facilityId, date, time            
} = req.body; // Destructure the request body to get userId, facilityId, date, and time
      const updateData = {};        
        if (userId) updateData.userId = userId; // If userId is provided, add it to the update data     
        if (facilityId) updateData.facilityId = facilityId; // If facilityId is provided, add it to the update data     
        if (date) updateData.date = date; // If date is provided, add it to the update data
        if (time) updateData.time = time;   // If time is provided, add it to the update data
      const updatedBooking = await      Booking.findByIdAndUpdate(id, updateData, { new: true }); // Update the booking by ID and return the updated booking                
        if (!updatedBooking) { // If booking is not found                       
        return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message
      }                 
        res.status(200).json(updatedBooking); // Respond with the updated booking details       
    } catch (error) {       
        console.error('❌ Error updating booking:', error); // Log the error to the console 
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
    }           
});     

// DELETE route to delete a booking by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Get the booking ID from the request parameters              
    try { // Fetch a booking by ID from the database    
    const deletedBooking = await Booking.findByIdAndDelete(id); // Find the booking by ID and delete it
    if (!deletedBooking) { // If booking is not found
      return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message
    }           
    res.status(200).json({ message: 'Booking deleted successfully' }); // Respond with a success message
  }             
    catch (error) {     
    console.error('❌ Error deleting booking:', error); // Log the error to the console         
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }         
});

export default router; // Export the router to be used in the main application file     
