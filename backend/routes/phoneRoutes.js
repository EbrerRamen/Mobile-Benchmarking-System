const express = require('express');
const {
  addPhone,
  getPhones,
  updatePhone,
  deletePhone,
  getPhoneDetails,
  getTrendingPhones,
  getRelatedPhones,
  getTopValuePhones,
  benchmarkPhones
} = require('../controllers/phoneController');

const router = express.Router();

router.post('/add', addPhone);          // Admin: Add phone
router.get('/top-value', getTopValuePhones); // Get top value for money phones
router.get('/trending', getTrendingPhones); // Get Trending Phones
router.get('/benchmark', benchmarkPhones);     // Benchmark two phones
router.get('/', getPhones);             // User: View all phones
router.put('/:id', updatePhone);        // Admin: Edit phone
router.delete('/:id', deletePhone);     // Admin: Delete phone
router.get('/:phoneId', getPhoneDetails); // Get Phone Details
router.get('/:id/related',getRelatedPhones) // Show similar phones


module.exports = router;
