import express from "express";
import { 
  getDashboardStats, 
  manageUsers, 
  manageFacilities, 
  manageBookings, 
  managePayments 
} from "../Controllers/adminController.js";
import { authenticateToken, authorizeAdmin } from "../Middleware/auth.js";

const router = express.Router();

// All admin routes require admin role
router.use(authenticateToken, authorizeAdmin);

router.get("/dashboard", getDashboardStats);

// These can be granular or grouped depending on your controller
router.get("/users", manageUsers);
router.get("/facilities", manageFacilities);
router.get("/bookings", manageBookings);
router.get("/payments", managePayments);

export default router;
