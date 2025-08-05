const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden

    try {
      console.log('Decoded JWT:', decoded);

      // Handle _id as string if present
      const userId = decoded.userId 
      console.log('UserId from token:', userId);
      if (!userId) return res.sendStatus(403);
      const user = await User.findById(userId);
      if (!user) return res.sendStatus(403);
      req.user = user;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.sendStatus(500);
    }
  });
}

module.exports = authenticateToken;