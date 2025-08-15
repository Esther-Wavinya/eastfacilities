import express from "express";
import { authenticateToken, authorizeAdmin } from "../Middleware/auth.js";
import { getDashboardStats, getAllUsers, getAllBookings, getAllPayments, updateUserRole, systemHealthCheck } from "../Controllers/dashboardController.js";

const router = express.Router();

// Dashboard summary. Admin only. Returns total users, bookings, payments, revenue.
router.get("/stats", authenticateToken, authorizeAdmin, getDashboardStats);

// User management. Admin only, returns all users without passwords
router.get("/users", authenticateToken, authorizeAdmin, getAllUsers);
router.put("/users/role", authenticateToken, authorizeAdmin, updateUserRole);

//Bookings and Payments
router.get("/bookings", authenticateToken, authorizeAdmin, getAllBookings);
router.get("/payments", authenticateToken, authorizeAdmin, getAllPayments);

// System health check. Public endpoint (no auth) to check if the API is alive
router.get("/health", systemHealthCheck);

export default router;

















