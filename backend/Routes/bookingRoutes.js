import express from "express";
import { 
  getBookings, 
  getBookingById, 
  createBooking, 
  updateBooking, 
  deleteBooking 
} from "../Controllers/bookingController.js";
import { authenticateToken } from "../Middleware/auth.js";

const router = express.Router();

// All booking routes require login
router.use(authenticateToken);

router.get("/", getBookings);               // User can view own bookings, admin can see all
router.get("/:id", getBookingById);         // Only owner or admin
router.post("/", createBooking);            // Create new booking
router.put("/:id", updateBooking);          // Update existing booking (owner or admin)
router.delete("/:id", deleteBooking);       // Cancel booking (owner or admin)

export default router;
