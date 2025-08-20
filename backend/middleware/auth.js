const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.seller = await Seller.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) return res.status(401).json({ message: 'No token, not authorized' });
};

module.exports = { protect };
