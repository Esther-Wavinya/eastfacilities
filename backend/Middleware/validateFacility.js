import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation and verification
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

export const validateFacilityCreate = [
    body("name")    
        .notEmpty() // Validate that name is not empty
        .withMessage("Name is required"), // Custom error message for empty name
    body("location")    
        .notEmpty() // Validate that location is not empty
        .withMessage("Location is required"), // Custom error message for empty location
    body("description")     
        .notEmpty() // Validate that description is not empty
        .withMessage("Description is required"), // Custom error message for empty description
    async (req, res, next) => { // Middleware function to handle validation results 
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) { // If there are validation errors
            return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
        }   
        try {
            const { name, location, description } = req.body; // Destructure the request body to get name, location, and description
            const newFacility = new Facility({ name, location, description }); // Create a new Facility instance
            await newFacility.save(); // Save the new facility to the database
            res.status(201).json({ message: "Facility created successfully" }); // Respond with a 201 status code and a success message
        } catch (error) {
            console.error("❌ Error creating facility:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 status code and an error message
        }       
        next(); // Call the next middleware or route handler
    }   
];


export const validateFacilityUpdate = [ 
    body("name")
        .notEmpty() // Validate that name is not empty
        .withMessage("Name is required"), // Custom error message for empty name        
    body("location")
        .notEmpty() // Validate that location is not empty
        .withMessage("Location is required"), // Custom error message for empty location    
    body("description")
        .notEmpty() // Validate that description is not empty
        .withMessage("Description is required"), // Custom error message for empty description      
    async (req, res, next) => { // Middleware function to handle validation results
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) { // If there are validation errors
            return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
        }       
        try {
            const { id } = req.params; // Get the facility ID from the request parameters
            const { name, location, description } = req.body; // Destructure the request body to get name, location, and description
            const updateData = {};  
            if (name) updateData.name = name; // If name is provided, add it to the update data
            if (location) updateData.location = location; // If location is provided, add it to the update data
            if (description) updateData.description = description; // If description is provided, add it to the update data
            const updatedFacility = await Facility.findByIdAndUpdate(id, updateData, { new: true }); // Update the facility by ID and return the updated facility
            if (!updatedFacility) { // If facility is not found
                return res.status(404).json({ error: "Facility not found" }); // Respond with a 404 status code and an error message
            }               
            req.facility = updatedFacility; // Attach the updated facility details to the request object
            next(); // Call the next middleware or route handler
        } catch (error) {
            console.error("❌ Error updating facility:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 status code and an error message
        }       
    }
];      


export const validateFacilityDelete = async (req, res, next) => {
    const { id } = req.params;      
    try {           
        const deletedFacility = await Facility.findByIdAndDelete(id); // Find the facility by ID and delete it
        if (!deletedFacility) { // If facility is not found
            return res.status(404).json({ error: "Facility not found" }); // Respond with a 404 status code and an error message
        }       
        res.status(200).json({ message: "Facility deleted successfully" }); // Respond with a success message
    } catch (error) {   
        console.error("❌ Error deleting facility:", error);
        res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 status code and an error message
    }   
    next(); // Call the next middleware or route handler
}     


export const validateFacilityRequest = (req, res, next) => { // Middleware function to validate request data
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
        return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }       
    next(); // Call the next middleware or route handler
}   












