const Seller = require('../models/Seller');

exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().select('-password');
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
