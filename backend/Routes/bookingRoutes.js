import express from 'express';
import Booking from '../Models/Booking';
import { authenticateToken } from '../Middleware/auth'; // Import authentication and authorization middleware)
import { validateBookingCreate, validateBookingUpdate, validateBookingDelete } from '../Middleware/validateBooking';   

const router = express.Router(); // Create a new router instance    


// GET route to fetch all bookings
router.get('/', authenticateToken, async (req, res) => { // Use authentication middleware to protect the route
  try { // Fetch all bookings from the database                 
    const bookings = await Booking.find(); // Find all bookings in the database
    res.status(200).json(bookings); // Respond with the list of bookings
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);            
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }
});     


// GET route to fetch a booking by ID
router.get('/:id', authenticateToken, async (req, res) => { // Use authentication middleware to protect the route
  const { id } = req.params; // Get the booking ID from the request parameters          
    try { // Fetch a booking by ID from the database        
    const booking = await Booking.findById(id); // Find the booking by ID
    if (!booking) { // If booking is not found
      return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message
    }   
    res.status(200).json(booking); // Respond with the booking details
  } 
    catch (error) { 
    console.error('❌ Error fetching booking:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  } 
}); 


// The route creates a new booking with validated input, saves it to the database, and sends success or error responses.
router.post('/', authenticateToken, validateBookingCreate, async (req, res) => { // Use authentication middleware and validation middleware to protect the route
    try {
        const { facilityId, userId, date, time } = req.body;    // Destructure the request body to get facilityId, userId, date, and time   
        const newBooking = new Booking({ facilityId, userId, date, time }); // Create a new Booking instance with the provided data
        await newBooking.save(); // Save the new booking to the database
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking }); // Respond with a 201 status code and a success message
    } catch (error) {
        console.error('❌ Error creating booking:', error);         
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
    }     
});




// PUT route to update a booking by ID  
router.put('/:id', authenticateToken, validateBookingUpdate, async (req, res) => { // Use authentication middleware and validation middleware to protect the route  
    try {
        const { id } = req.params; // Get the booking ID from the request parameters
        const { facilityId, userId, date, time } = req.body;    // Destructure the request body to get facilityId, userId, date, and time   
        const updateData = {}; // Create an object to hold the update data
        if (facilityId) updateData.facilityId = facilityId; // If facilityId is provided, add it to the update data
        if (userId) updateData.userId = userId; // If userId is provided, add it to the update data
        if (date) updateData.date = date; // If date is provided, add it to the update data
        if (time) updateData.time = time; // If time is provided, add it to the update data
        const updatedBooking = await Booking.findByIdAndUpdate(id, updateData, { new: true }); // Update the booking by ID and return the updated booking   
        if (!updatedBooking) { // If booking is not found
            return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message
        }   
        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking }); // Respond with a success message and the updated booking details
    } catch (error) {
        console.error('❌ Error updating booking:', error);         
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
    }       
}); 



// DELETE route to delete a booking by ID   
router.delete('/:id', authenticateToken, validateBookingDelete, async (req, res) => { // Use authentication middleware and validation middleware to protect the route
  const { id } = req.params; // Get the booking ID from the request parameters
  try { // Find the booking by ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(id); // Find the booking by ID and delete it 
    if (!deletedBooking) { // If booking is not found       
        return res.status(404).json({ error: 'Booking not found' }); // Respond with a 404 status code and an error message 
    }
    res.status(200).json({ message: 'Booking deleted successfully' }); // Respond with a success message
  }     
  catch (error) { // Handle any errors that occur during the deletion process
    console.error('❌ Error deleting booking:', error); 
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  } 
});

export default router; // Export the router to be used in the main application file 











