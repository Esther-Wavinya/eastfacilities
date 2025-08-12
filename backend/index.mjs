import express from 'express'; // To create the web server
import mongoose from 'mongoose'; // To connect and interact with MongoDB
import cors from 'cors'; // To enable Cross-Origin Resource Sharing, allowing the API to be accessed from different origins or accept requests from different origins
import dotenv from 'dotenv'; // To load environment variables from a .env file (like database URI, port, etc.)
import { validateUserLogin }  from './Middleware/validateUser';

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of Express


// Middleware to handle CORS and JSON body parsing
app.use(cors()); // Enable CORS for all routes, allowing requests from any origin
app.use(express.json()); // Parse incoming JSON requests, allowing the server to understand JSON payloads

// app.post("/login", validateUserLogin, (req, res) => {
//   res.json({ token: req.token, user: req.user });
// });


// Middleware to handle URL-encoded data
// app.use(express.urlencoded({ extended: true })); // Parse incoming requests with URL-encoded payloads, allowing the server to understand form submissions   


// Middleware to handle static files (if needed)
// app.use(express.static('public')); // Uncomment if you have a 'public' directory for static files  


// Middleware to handle errors globally
// app.use((err, req, res, next) => {
//  console.error('❌ Error:', err.message);  // Log the error message to the console 
//  res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and a generic error message
//});


// Middleware to handle 404 errors
// app.use((req, res) => {
//  res.status(404).json({ error: 'Not Found' }); // Respond with a 404 status code and a 'Not Found' message for any unmatched routes    
//});

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI, { // Make sure your .env uses MONGO_URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware to log requests (optional, for debugging purposes)
// app.use((req, res, next) => {
//  console.log(`📥 ${req.method} request to ${req.url}`); // Log the HTTP method and URL of incoming requests
//  next(); // Call the next middleware or route handler
//});

// Import routes (if you have any defined in separate files)
// import userRoutes from './routes/userRoutes.js'; // Example import, adjust according to your routes structure
// app.use('/api/users', userRoutes); // Use the imported routes under a specific path  

// If you have more routes, import and use them here
// import facilityRoutes from './routes/facilityRoutes.js'; // Example import, adjust according to your routes structure
// app.use('/api/facilities', facilityRoutes); // Use the imported routes under a specific path 

// If you have more routes, import and use them here        
// import anotherRoute from './routes/anotherRoute.js'; // Example import, adjust according to your routes structure
// app.use('/api/another', anotherRoute); // Use the imported routes under a specific path

// Routes
// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the EAST Facilities API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Export the app for testing or further configuration
// export default app;
