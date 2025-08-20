const express = require('express');
const router = express.Router();
const { getAllSellers } = require('../controllers/sellerController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllSellers);

module.exports = router;
