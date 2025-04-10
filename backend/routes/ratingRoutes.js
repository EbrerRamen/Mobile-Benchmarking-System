const express = require('express');
const {
  addRating,
  getRatingsForPhone,
  getAverageRatings
} = require('../controllers/ratingController');

const router = express.Router();

router.post('/add', addRating);
router.get('/:phoneId', getRatingsForPhone);
router.get('/:phoneId/average', getAverageRatings); // NEW

module.exports = router;