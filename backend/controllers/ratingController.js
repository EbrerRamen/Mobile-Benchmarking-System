const mongoose = require('mongoose');
const Rating = require('../models/Rating');

// Add Rating
exports.addRating = async (req, res) => {
  try {
    const { phone, user, ratings, comment } = req.body;

    const existing = await Rating.findOne({ phone, user });
    if (existing) {
      return res.status(400).json({ message: 'You have already rated this phone.' });
    }

    const rating = await Rating.create({ phone, user, ratings, comment });
    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Check if a specific user rated this specific phone
exports.checkIfRated = async (req, res) => {
  const { phoneId, user } = req.params;
  try {
    const existing = await Rating.findOne({ phone: phoneId, user });
    res.status(200).json({ hasRated: !!existing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all ratings for a phone
exports.getRatingsForPhone = async (req, res) => {
  try {
    const ratings = await Rating.find({ phone: req.params.phoneId });
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get average rating values for a phone
exports.getAverageRatings = async (req, res) => {
  try {
    const phoneId = req.params.phoneId;

    const result = await Rating.aggregate([
      { $match: { phone: new mongoose.Types.ObjectId(phoneId) } },
      {
        $group: {
          _id: '$phone',
          avgCamera: { $avg: '$ratings.camera' },
          avgBattery: { $avg: '$ratings.battery' },
          avgDisplay: { $avg: '$ratings.display' },
          avgProcessor: { $avg: '$ratings.processor' },
          count: { $sum: 1 }
        }
      }
    ]);

    if (!result.length) {
      return res.status(404).json({ error: 'No ratings found for this phone.' });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
