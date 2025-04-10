const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number },
  features: {
    camera: String,
    battery: String,
    display: String,
    processor: String,
  },
  imageUrl: { type: String, required: true }, // Add image URL field
}, { timestamps: true });

module.exports = mongoose.model('Phone', phoneSchema);
