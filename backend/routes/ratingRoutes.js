
const express = require('express');
const {
  addRating,
  getRatingsForPhone,
  getAverageRatings,
  checkIfRated, 
} = require('../controllers/ratingController');

const router = express.Router();


router.post('/add', addRating); // Add Rating
router.get('/:phoneId', getRatingsForPhone); // Get all ratings for a specific phone
router.get('/:phoneId/average', getAverageRatings); // Get average ratings for a phone
router.get('/check/:phoneId/:user', checkIfRated); // Check if a specific user has already rated this phone

module.exports = router;
