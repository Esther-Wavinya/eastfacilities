// Imports the User model (a Mongoose schema for your users).
// This model interacts with the MongoDB users collection
import User from "../Models/User.js";

// Fetches all users from MongoDB. .select("-password") → excludes the password field from the response (for security). Responds with a JSON array of user objects.
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Finds a user by ID from URL parameter (req.params.id). Excludes password from the response. If no user is found → returns HTTP 404 with { error: "User not found" }. Otherwise → returns the user object in JSON
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

// Updates a user by ID using data from req.body. { new: true } → ensures the updated document is returned, not the old one. Excludes password from the response. If no user is found → returns 404 error. Otherwise → returns the updated user object in Json.
export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

// Deletes a user by ID. If no user is found → returns 404 error. Otherwise → returns a confirmation JSON { message: "User deleted" }
export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted" });
};
