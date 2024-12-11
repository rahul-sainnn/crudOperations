const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
  try {
    console.log('Authorization Header:', req.headers.authorization);

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id); 

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = user;
    
    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};


exports.isAdmin = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Access denied for role: ${req.user.role}` });
    }
    next();
  };
};
