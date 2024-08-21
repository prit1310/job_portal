const validate = (schema) => (req, res, next) => {
    // Check if schema is provided and is an object
    if (!schema || typeof schema.parse !== 'function') {
      return res.status(500).json({
        message: 'Internal server error',
        extraDetails: 'Validation schema is missing or invalid',
      });
    }
  
    try {
      // Validate the request body against the schema
      schema.parse(req.body);
      next();
    } catch (e) {
      console.error('Validation error:', e); // Log the entire error for debugging
    
      // Default response structure
      const response = {
        message: 'Validation error',
        extraDetails: 'Invalid request data',
      };
    
      // Check if `e.errors` is available and handle different structures
      if (e && e.errors) {
        if (Array.isArray(e.errors)) {
          // If `e.errors` is an array, map it to the expected format
          response.errors = e.errors.map(err => ({
            path: err.path || 'unknown',
            message: err.message || 'Unknown error',
          }));
        } else if (e.errors && e.errors.errors) {
          // Handle nested error structures
          response.errors = e.errors.errors.map(err => ({
            path: err.path || 'unknown',
            message: err.message || 'Unknown error',
          }));
        } else {
          // Handle unexpected error structures
          response.extraDetails = 'Unexpected error format';
        }
      }
    
      // Send the error response
      res.status(400).json(response);
    }
  };
  
  module.exports = validate;
  