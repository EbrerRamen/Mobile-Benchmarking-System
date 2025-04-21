const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  phone: { type: mongoose.Schema.Types.ObjectId, ref: 'Phone', required: true },
  user: { type: String, required: true },
  ratings: {
    camera: Number,
    battery: Number,
    display: Number,
    processor: Number,
  },
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);
