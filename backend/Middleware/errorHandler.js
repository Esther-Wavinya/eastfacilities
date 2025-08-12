// Middleware to handle errors globally. This middleware is called whenever an error is passed to next(err) inside your routes or other middleware. It logs the error message to the server console for debugging. Then it responds to the client with a 500 status code (Internal Server Error) and a simple JSON message. This prevents internal error details from leaking to the client while letting you know what went wrong on the server.
export const errorHandler = (err, req, res, next) => { // Middleware to handle errors globally, errorHandler function takes four parameters
  console.error('❌ Error:', err.message);  // Log the error message to the console     
    res.status(500).json({ error: 'Internal Server Error' }); // Respond with a 500 status code and a generic error message
};

// Middleware to handle 404 errors. This middlewware is used after all route definitions. It catches any requests that didn't match any defined routes. It responds with a 404 Not Founf status and a JSON error message. This helps clients know the requested resource/path doesn't exist on your server.
export const notFoundHandler = (req, res) => { // Middleware to handle 404 errors, notFoundHandler function takes two parameters
  res.status(404).json({ error: 'Not Found' }); // Respond with a 404 status code and a 'Not Found' message for any unmatched routes    
};

     

    