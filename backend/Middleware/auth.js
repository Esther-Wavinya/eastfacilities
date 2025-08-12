import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for handling JWTs

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' }); // If no token is provided, respond with 401 Unauthorized
  }     
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Verify the token using the secret key
    if (err) {
      return res.status(403).json({ error: 'Invalid token' }); // If the token is invalid, respond with 403 Forbidden
    }       
    req.user = user; // Attach the user information from the token to the request object
    next(); // Call the next middleware or route handler
  });
}   

export const authorizeRole = (roles) => {   
    return (req, res, next) => { // Middleware function to check user role  
    if (req.user && roles.includes(req.user.role)) { // Check if user exists and has one of the required roles
      next(); // Call the next middleware or route handler
    } else {
      res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' }); // Respond with a 403 status code and an error message
    }       
    };  
};

export const authorizeAdmin = (req, res, next) => { // Middleware function to check if user is an admin
  if (req.user && req.user.role === 'admin') { // Check if user exists and has the role of admin
    next(); // Call the next middleware or route handler    
    } else {    
    res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' }); // Respond with a 403 status code and an error message
  }
};  


export const validateRequest = (req, res, next) => { // Middleware function to validate request data
  const errors = validationResult(req); // Check for validation errors
  if (!errors.isEmpty()) { // If there are validation errors
    return res.status(400).json({ errors: errors.array() }); // Respond with a 400 status code and the validation errors
  }         
    next(); // Call the next middleware or route handler        
};



