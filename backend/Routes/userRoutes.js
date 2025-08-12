import express from 'express';
import User from '../Models/User.js'; // Adjust the path according to your project structure    
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
// import cors from 'cors'; // Import CORS middleware for handling cross-origin requests
// import mongoose from 'mongoose'; // Import mongoose for MongoDB interactions
import { body, validationResult } from 'express-validator'; // Import express-validator for request validation
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation and verification
import dotenv from 'dotenv'; // Import dotenv for environment variable management
dotenv.config(); // Load environment variables from .env file


const router = express.Router(); // Create a new router instance

// GET route to fetch all users
router.get('/', async (req, res) => {
  try { // Fetch all users from the database
    const users = await User.find();        
    res.status(200).json(users); // Respond with the list of users
  } catch (error) {
    console.error('❌ Error fetching users:', error);       
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }
});

// GET route to fetch a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;        
    try { // Fetch a user by ID from the database   
    const user = await User.findById(id); // Find the user by ID
    if (!user) { // If user is not found
      return res.status(404).json({ error: 'User not found' }); // Respond with a 404 status code and an error message
    }       
    res.status(200).json(user); // Respond with the user details
  } 
    catch (error) { 
    console.error('❌ Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  } 
});

// POST route to create a new user  
router.post('/',
  [
    body('name').notEmpty().withMessage('Name is required'), // Validate that name is not empty     
    body('email').isEmail().withMessage('Invalid email format'), // Validate that email is in correct format
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Validate that password is at least 6 characters long
  ],
    async (req, res) => {   
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }
    try {
      const { name, email, password } = req.body; // Destructure the request body to get name, email, and password
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt rounds of 10
      const newUser = new User({ name, email, password: hashedPassword }); // Create a new User instance with the hashed password
      await newUser.save(); // Save the new user to the database
      res.status(201).json({ message: 'User created successfully' }); // Respond with a 201 status code and a success message
    } catch (error) {
      console.error('❌ Error creating user:', error);      
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message    
    }
  });

  // PUT route to update a user by ID
router.put('/:id',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'), // Validate that name is not empty if provided      
    body('email').optional().isEmail().withMessage('Invalid email format'), // Validate that email is in correct format if provided
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Validate that password is at least 6 characters long if provided
  ],    
    async (req, res) => {       
    const { id } = req.params; // Get the user ID from the request parameters
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }   
    try {
      const { name, email, password } = req.body; // Destructure the request body to get name, email, and password
      const updateData = {};        
        if (name) updateData.name = name; // If name is provided, add it to the update data 
        if (email) updateData.email = email; // If email is provided, add it to the update data
        if (password) updateData.password = await bcrypt.hash(password, 10); // If password is provided, hash it and add it to the update data
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }); // Update the user in the database and return the updated user
      if (!updatedUser) { // If user is not found
        return res.status(404).json({ error: 'User not found' }); // Respond with a 404 status code and an error message
      }     
        res.status(200).json(updatedUser); // Respond with the updated user details 
    } catch (error) {
      console.error('❌ Error updating user:', error);       
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message    
    }                   
    }); 

 // DELETE route to delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;    
    try { // Delete a user by ID from the database
    const deletedUser = await User.findByIdAndDelete(id); // Find the user by ID and delete them
    if (!deletedUser) { // If user is not found
      return res.status(404).json({ error: 'User not found' }); // Respond with a 404 status code and an error message
    }   
    res.status(200).json({ message: 'User deleted successfully' }); // Respond with a 200 status code and a success message
  }
    catch (error) {     
    console.error('❌ Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message
  }     
});

// POST route for user login    
router.post('/login',
  [
    body('email').isEmail().withMessage('Invalid email format'), // Validate that email is in correct format    
    body('password').notEmpty().withMessage('Password is required') // Validate that password is not empty
  ],
  async (req, res) => { 
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) { // If there are validation errors
      return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
    }
    try {
      const { email, password } = req.body; // Destructure the request body to get email and password
      const user = await User.findOne({ email }); // Find the user by email in the database
      if (!user) { // If user is not found
        return res.status(404).json({ error: 'User not found' }); // Respond with a 404 status code and an error message
      } 
        const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database    
        if (!isMatch) { // If the passwords do not match
            return res.status(401).json({ error: 'Invalid credentials' }); // Respond with a 401 status code and an error message   
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' }); // Generate a JWT token with user ID and role, valid for 30 days
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }); // Respond with a 200 status code and the token along with user details
    } catch (error) {
      console.error('❌ Error logging in user:', error);    
        res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and an error message    
    }
    });

// Export the user routes for use in other parts of the application
export default router; // Export the router instance containing user routes 
// This allows the routes to be imported and used in the main application file or other route files
// This is useful for organizing routes and keeping the code modular
// You can import this router in your main application file and use it with app.use('/api/users', userRoutes);


