import express from "express";
import { authenticateToken, authorizeAdmin } from "../Middleware/auth.js";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../Controllers/userController.js";
const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteUser);

export default router;
