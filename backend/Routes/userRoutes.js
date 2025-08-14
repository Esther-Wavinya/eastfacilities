import express from "express"; // used to create the router
// authenticateToken middleware that chacks if the request has a valid JWT token (ensures the user is logged in). 
// authorizeAdmin middleware that checks if the logged in user has an admin role (restricts certain routes to admins only)
import { authenticateToken, authorizeAdmin } from "../Middleware/auth.js"; 
// Controller functions, actual route handlers
// getAllUsers, fetches all users
// getUserById, fetches one user by their ID
// updateUser, updates user information
// deleteUser, deletes a user
import { getAllUsers, getUserById, updateUser, deleteUser } from "../Controllers/userController.js";

// Creates an isolated router instance for user related endpoints (keeps code modular)
const router = express.Router();

// Fetch all users. Protected by both middlewares: authenticateToken, must be logged in. authorizeAdmin, must be an admin. Handled by getAllUsers() controller.
router.get("/", authenticateToken, authorizeAdmin, getAllUsers); 
// Fetch a specific user by ID. Requires login, but does not require admin privileges (likely so users can fetch their own profile). Handled by getUserById() controller
router.get("/:id", authenticateToken, getUserById); 
// Update a specific user by ID. Requires login, but no explicit admin check (meaning a user could update their own profile). Handled by updateUser() controller
router.put("/:id", authenticateToken, updateUser);
// Delete a specific user by ID. Requires both login and admin privileges. Handled by deleteUser() controller.
router.delete("/:id", authenticateToken, authorizeAdmin, deleteUser);
// Creates an isolated router instance for user related endpoint (keeps code modular)
export default router;
































