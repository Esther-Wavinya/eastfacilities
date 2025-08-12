import { body, validationResult } from "express-validator"; 
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation and verification
import User from "../Models/User.js"; // Import the User model
import { validateRequest } from "./auth.js";
import dotenv from 'dotenv'
/* eslint-env node */

dotenv.config();

export const validateUserCreate = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()  // Validate that email is in correct format     
    .withMessage("Invalid email format"), // Custom error message for invalid email format
  body("password")
    .isLength({ min: 6 }) // Validate that password is at least 6 characters long   
    .withMessage("Password must be at least 6 characters long"), // Custom error message for short password
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
 ];


export const validateUserUpdate = [
  body("email")
    .optional() // Email is optional for update     
    .isEmail() // Validate that email is in correct format if provided      
    .withMessage("Invalid email format"), // Custom error message for invalid email format
  body("password")
    .optional() // Password is optional for update  
    .isLength({ min: 6 }) // Validate that password is at least 6 characters long if provided
    .withMessage("Password must be at least 6 characters long"), // Custom error message for short password
  (req, res, next) => {
    const errors = validateRequest(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
  }  
];

export const validateUserDelete = async (req, res, next) => {
  const { id } = req.params;        
        try {
            const userExists = await User.findById(id);
            if (!userExists) {
                return res.status(404).json({ error: 'User not found' });
            }
            next(); //Move on to the delete handler
        } catch (error) {
          console.error('❌ Error validating user before delete:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }     
};

export const validateUserLogin = [  
  body("email")   
    .isEmail() // Validate that email is in correct format
    .withMessage("Invalid email format"), // Custom error message for invalid email format
  body("password")          
    .notEmpty() // Validate that password is not empty
    .withMessage("Password is required"), // Custom error message for missing password
  async (req, res, next) => { // Middleware function to handle validation results           
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }       
    try {
      const { email, password } = req.body; // Destructure the request body to get email and password
      const user = await User.findOne({ email }); // Find the user by email in the database      
        if (!user) { // If user is not found        
        return res.status(404).json({ error: "User not found" }); // Respond with a 404 status code and an error message
      } 
        const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database        
        if (!isMatch) { // If password does not match       
            return res.status(401).json({ error: "Invalid credentials" }); // Respond with a 401 status code and an error message
        }  
        // Generate token example     
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" }); // Generate a JWT token with user ID, valid for 30 days     
        // Attach user and token to request object for next middleware/controller
        req.user = { id: user._id, name: user.name, email: user.email, role: user.role }; // Attach user details to the request object for further use
        req.token = token; // Attach the generated token to the request object
        next(); // Call the next middleware or route handler
    }       catch (error) {     
        console.error("❌ Error validating user login:", error);        
        res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 status code and an error message
    }
  }             
];  

export const validateUserRole = (role) => {
  return (req, res, next) => { // Middleware function to check user role
    if (req.user && req.user.role === role) { // Check if user exists and has the required role
      next(); // Call the next middleware or route handler
    } else {
      res.status(403).json({ error: "Forbidden: You do not have permission to access this resource" }); // Respond with a 403 status code and an error message
    }
  };    
};  

export const validateUserRequest = (req, res, next) => { // Middleware function to validate request data
  const errors = validationResult(req); // Check for validation errors
  if (!errors.isEmpty()) { // If there are validation errors
    return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
  }     
    next(); // Call the next middleware or route handler    
};      






