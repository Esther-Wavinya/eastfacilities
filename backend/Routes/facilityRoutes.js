import express from 'express';
import facility from '../Models/Facility.js'; // Adjust the path according to your project structure
import { body, validationResult } from 'express-validator'; // Import express-validator for request validation  

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
router.post('/',
  [ 
    body('name').notEmpty().withMessage('Name is required'), // Validate that name is not empty
    body('location').notEmpty().withMessage('Location is required'), // Validate that location is not empty
    body('description').notEmpty().withMessage('Description is required') // Validate that description is not empty
  ],    
    async (req, res) => {   
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }       
    try {
      const { name, location, description } = req.body; // Destructure the request body to get name, location, and description
      const newFacility = new facility({ name, location, description });    // Create a new Facility instance   
        await newFacility.save(); // Save the new facility to the database          
        res.status(201).json({ message: 'Facility created successfully' }); // Respond with a 201 status code and a success message 
    } catch (error) {
      console.error('❌ Error creating facility:', error);      
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message    
    }       
    });

// PUT route to update a facility by ID
router.put('/:id',
  [ 
    body('name').notEmpty().withMessage('Name is required'), // Validate that name is not empty 
    body('location').notEmpty().withMessage('Location is required'), // Validate that location is not empty
    body('description').notEmpty().withMessage('Description is required') // Validate that description is not empty
  ],    
    async (req, res) => {   
    const { id } = req.params; // Get the facility ID from the request parameters  
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }   
    try {       
        const { name, location, description } = req.body; // Destructure the request body to get name, location, and description    
        const updatedFacility = await facility.findByIdAndUpdate(id, { name, location, description }, { new: true }); // Update the facility by ID
      if (!updatedFacility) { // If facility is not found
        return res.status(404).json({ error: 'Facility not found' }); // Respond with a 404 status code and an error message
      }     
        res.status(200).json(updatedFacility); // Respond with the updated facility details 
    } catch (error) {   
        console.error('❌ Error updating facility:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
    }       
    });


// DELETE route to delete a facility by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;        
    try { // Delete a facility by ID from the database  
    const deletedFacility = await facility.findByIdAndDelete(id); // Find and delete the facility by ID
    if (!deletedFacility) { // If facility is not found
      return res.status(404).json({ error: 'Facility not found' }); // Respond with a 404 status code and an error message
    }   
    res.status(200).json({ message: 'Facility deleted successfully' }); // Respond with a success message
  }
    catch (error) { 
    console.error('❌ Error deleting facility:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }
});

// Export the router to be used in other parts of the application
export default router;  
// Export the router to be used in other parts of the application
// export { facilitySchema }; // Export the schema if needed for further customization or validation
// export { Facility }; // Export the Facility model for use in other parts of the application  