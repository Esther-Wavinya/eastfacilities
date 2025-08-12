import express from 'express';
import Facility from '../Models/Facility.js'; // Adjust the path according to your project structure
import { validateBookingCreate, validateBookingUpdate, validateBookingDelete } from '../Middleware/validateBooking.js';


const router = express.Router(); // Create a new router instance

// GET route to fetch all facilities
router.get('/', async (req, res) => {
  try { // Fetch all facilities from the database
    const facilities = await facility.find();   
    res.status(200).json(facilities); // Respond with the list of facilities
  } catch (error) {
    console.error('❌ Error fetching facilities:', error);       
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }             
});

// GET route to fetch a facility by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;    
    try { // Fetch a facility by ID from the database
    const facility = await facility.findById(id); // Find the facility by ID
    if (!facility) { // If facility is not found
      return res.status(404).json({ error: 'Facility not found' }); // Respond with a 404 status code and an error message
    }   
    res.status(200).json(facility); // Respond with the facility details
  } 
    catch (error) { 
    console.error('❌ Error fetching facility:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  } 
});

// POST route to create a new facility
router.post('/', validateBookingCreate, async (req, res) => { // Use validation middleware to protect the route
  try {
    const { name, location, description } = req.body; // Destructure the request body to get name, location, and description
    const newFacility = new Facility({ name, location, description }); // Create a new Facility instance with the provided data
    await newFacility.save(); // Save the new facility to the database
    res.status(201).json({ message: 'Facility created successfully', facility: newFacility }); // Respond with a 201 status code and a success message
  } catch (error) {
    console.error('❌ Error creating facility:', error);         
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  } 
});
   

// PUT route to update a facility by ID
router.put('/:id', validateBookingUpdate, async (req, res) => { // Use validation middleware to protect the route
  const { id } = req.params; // Get the facility ID from the request parameters
  const { name, location, description } = req.body; // Destructure the request body to get name, location, and description
  const updateData = {};  
  if (name) updateData.name = name; // If name is provided, add it to the update data
  if (location) updateData.location = location; // If location is provided, add it to the update data
  if (description) updateData.description = description; // If description is provided, add it to the update data
  try {
    const updatedFacility = await Facility.findByIdAndUpdate  (id, updateData, { new: true }); // Update the facility in the database and return the updated facility   
    if (!updatedFacility) { // If facility is not found
      return res.status(404).json({ error: 'Facility not found' }); // Respond with a 404 status code and an error message    
    }
    res.status(200).json({ message: 'Facility updated successfully', facility: updatedFacility }); // Respond with a success message and the updated facility
  } catch (error) {
    console.error('❌ Error updating facility:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }       
  next(); // Call the next middleware or route handler
});



// DELETE route to delete a facility by ID
router.delete('/:id', validateBookingDelete, async (req, res) => {
  const { id } = req.params; // Get the facility ID from the request parameters
  try {
    const deletedFacility = await Facility.findByIdAndDelete(id); // Find the facility by ID and delete it
    if (!deletedFacility) { // If facility is not found
      return res.status(404).json({ error: 'Facility not found' }); // Respond with a 404 status code and an error message
    }   
    res.status(200).json({ message: 'Facility deleted successfully' }); // Respond with a success message
  } catch (error) {
    console.error('❌ Error deleting facility:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }   
});

// Export the router to be used in other parts of the application
export default router;  
// Export the router to be used in other parts of the application
// export { facilitySchema }; // Export the schema if needed for further customization or validation
// export { Facility }; // Export the Facility model for use in other parts of the application  