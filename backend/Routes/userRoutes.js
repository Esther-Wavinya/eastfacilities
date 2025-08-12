import express from 'express';
import User from '../Models/User.js'; // Adjust the path according to your project structure    
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import dotenv from 'dotenv'; // Import dotenv for environment variable management
dotenv.config(); // Load environment variables from .env file
import { validateUserCreate, validateUserUpdate, validateUserDelete, validateUserLogin } from '../Middleware/validateUser.js'; // Import validation middleware for user creation and update

// Create a new router instance
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
router.post('/', validateUserCreate, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({  error: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
      } 
        catch (error) {
        console.error('❌ Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

});


 // PUT route to update a user by ID
router.put('/:id', validateUserUpdate, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.password = await bcrypt.hash(password, 10);

      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
        console.error('❌ Error updating user:', error);
         res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE route to delete a user by ID
router.delete('/:id', validateUserDelete, async (req, res) => {
  const { id } = req.params;    
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('❌ Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route for user login    
router.post('/login', validateUserLogin, (req, res) => {
  res.status(200).json({
    token: req.token,
    user: req.user
  });
});
  

// Export the user routes for use in other parts of the application
export default router; // Export the router instance containing user routes 
// This allows the routes to be imported and used in the main application file or other route files
// This is useful for organizing routes and keeping the code modular
// You can import this router in your main application file and use it with app.use('/api/users', userRoutes);


