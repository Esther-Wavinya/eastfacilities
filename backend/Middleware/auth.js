// Brings in the jsonwebtoken library to handle token verification
import jwt from "jsonwebtoken";

// Extracts the JWT token from the Authorization header (format: Bearer<token>).
// If no token is provided, it responds with 401 Unauthorized
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied, no token provided" });
// If a token is provided, verifies it using the secret key (process.env.JWT_SECRET):
// If verification fails, respond with 403 Forbidden/Invalid token
// If verification succeeds, stores the decoded token payload ( user ) in req.user for later use and calls next() to move to the next middleware or route handler
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};


// This is a higher order middleware that restricts access to specific user roles
// roles is an array of allowed roles, e.g., ["admin", "manager"]
// Checks if req.user.role exists and is included in the allowed roles:
export const authorizeRole = (roles) => (req, res, next) => {
  if (req.user && roles.includes(req.user.role)) return next(); // If yes, calls next() (grants access)
  res.status(403).json({ error: "Forbidden: insufficient permissions" }); // If no, responds with 403 Forbidden.
};


// A shortcut middleware for checking if a user is strictly an admin
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next(); // if req.user.role === "admin", calls next()
  res.status(403).json({ error: "Forbidden: admin only" });  // Otherwise, responds with 403 Forbidden
};
