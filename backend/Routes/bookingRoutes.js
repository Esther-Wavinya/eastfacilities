import express from "express";
import { 
  getBookings, 
  getBookingById, 
  createBooking, 
  updateBooking, 
  deleteBooking 
} from "../Controllers/bookingController.js";
import { authenticateToken } from "../Middleware/auth.js"; // Only logged in users can book facilities

const router = express.Router();

// All booking routes require login
router.use(authenticateToken); // All the endpoints require the user to be logged in

router.get("/", getBookings);               // User sees their own bookings, admin can see all
router.get("/:id", getBookingById);         // Only owner or admin can view a specific booking
router.post("/", createBooking);            // Create a new booking
router.put("/:id", updateBooking);          // Update an existing booking (only owner or admin)
router.delete("/:id", deleteBooking);       // Cancel a booking (only owner or admin)

export default router;
