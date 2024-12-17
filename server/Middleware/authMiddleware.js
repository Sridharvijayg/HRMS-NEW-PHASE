require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const rateLimit = require('express-rate-limit')

const resetPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour 
    max: 5, // limit each IP to 5 requests
    message: 'Too many password reset requests, please try again after an hour.',
    headers: true,
  });

  
  const Authorization = (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
          return res.status(401).json({ message: 'No token provided' });
      }
  
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
          if (err) {
              return res.status(401).json({ message: 'Invalid token' });
          }
          req.user = decoded;
          next();
      });
  };
  

module.exports = {resetPasswordLimiter,Authorization}