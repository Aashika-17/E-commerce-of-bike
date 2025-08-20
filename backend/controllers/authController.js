const Seller = require('../models/Seller');
const generateToken = require('../utils/generateToken');

// Register
exports.register = async (req, res) => {
  console.log('Incoming registration data:', req.body);

  const { firstName, lastName, email, password, businessName, website } = req.body;

  try {
    const exists = await Seller.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Seller already exists' });

    const seller = await Seller.create({ firstName, lastName, email, password, businessName, website });

    console.log('Seller created:', seller);

    res.status(201).json({
      _id: seller._id,
      firstName: seller.firstName,
      lastName: seller.lastName,
      email: seller.email,
      businessName: seller.businessName,
      token: generateToken(seller._id)
    });
  } catch (error) {
    console.error('Error creating seller:', error);
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  // your login code here...
};

// Get current seller
exports.getMe = async (req, res) => {
  res.json(req.seller);
};
