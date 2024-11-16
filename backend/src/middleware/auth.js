const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  console.log('Auth middleware triggered');
  console.log('Request headers:', req.headers);

  // Get token from the request header
  const token = req.header('x-auth-token')?.trim(); 
  console.log('Received token:', token);

  // Check if token is present
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    console.log('JWT_SECRET used:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Attach the user object to the request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ msg: 'Token is not valid', error: err.message });
  }
};
