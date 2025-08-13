import express from "express";
import { 
  getFacilities, 
  getFacilityById, 
  createFacility, 
  updateFacility, 
  deleteFacility 
} from "../Controllers/facilityController.js";
import { authenticateToken, authorizeAdmin } from "../Middleware/auth.js";

const router = express.Router();

// Public: list and view
router.get("/", getFacilities);
router.get("/:id", getFacilityById);

// Protected: admin only
router.post("/", authenticateToken, authorizeAdmin, createFacility);
router.put("/:id", authenticateToken, authorizeAdmin, updateFacility);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteFacility);

export default router;
