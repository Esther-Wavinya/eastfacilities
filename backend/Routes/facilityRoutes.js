import express from "express";
import { 
  getFacilities, 
  getFacilityById, 
  createFacility, 
  updateFacility, 
  deleteFacility 
} from "../Controllers/facilityController.js";
import { authenticateToken, authorizeAdmin } from "../Middleware/auth.js"; // authenticateToken checks if user is logged in. authorizeAdmin checks if user has admin role.

const router = express.Router();

// Public: list and view
router.get("/", getFacilities); // Anyone can list all facilities
router.get("/:id", getFacilityById); // Anyone can view details of a specific facility

// Protected: admin only
router.post("/", authenticateToken, authorizeAdmin, createFacility); // Admins only can create a new facility
router.put("/:id", authenticateToken, authorizeAdmin, updateFacility); // Admins only can update a facility
router.delete("/:id", authenticateToken, authorizeAdmin, deleteFacility); // Admins only can delete a facility

export default router;
