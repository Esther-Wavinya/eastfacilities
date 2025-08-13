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


// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI, { // Make sure your .env uses MONGO_URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

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
