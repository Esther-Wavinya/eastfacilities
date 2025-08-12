import { body, validationResult } from "express-validator";
import Facility from "../Models/Facility"; // Import the Facility model


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
   (req, res, next) => { // Middleware function to handle validation results
        const errors = validationResult(req); // Check for validation errors    
        if (!errors.isEmpty()) { // If there are validation errors
            return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
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
    (req, res, next) => { // Middleware function to handle validation results
        const errors = validationResult(req); // Check for validation errors
        if (!errors.isEmpty()) { // If there are validation errors
            return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
        }       
        next(); // Call the next middleware or route handler
    }       
];      


export const validateFacilityDelete = [
    body("id")
        .notEmpty() // Validate that id is not empty
        .withMessage("Facility ID is required"), // Custom error message for empty id   
        (req, res, next) => { // Middleware function to handle validation results
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }       
    next(); // Call the next middleware or route handler
}
];    


export const validateFacilityRequest = (req, res, next) => { // Middleware function to validate request data
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
        return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }       
    next(); // Call the next middleware or route handler
}   












