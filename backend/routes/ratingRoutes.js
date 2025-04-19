
const express = require('express');
const {
  addRating,
  getRatingsForPhone,
  getAverageRatings,
  checkIfRated, 
} = require('../controllers/ratingController');

const router = express.Router();

// Add Rating
router.post('/add', addRating);

// Get all ratings for a specific phone
router.get('/:phoneId', getRatingsForPhone);

// Get average ratings for a phone
router.get('/:phoneId/average', getAverageRatings);

// Check if a specific user has already rated this phone
router.get('/check/:phoneId/:user', checkIfRated); 

module.exports = router;
