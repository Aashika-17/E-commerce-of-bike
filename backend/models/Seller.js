const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const sellerSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  businessName: { type: String, required: true, trim: true },
  website: { type: String, trim: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['seller', 'admin'], default: 'seller' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' }
});

// Hash password before saving
sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
sellerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Seller', sellerSchema);
