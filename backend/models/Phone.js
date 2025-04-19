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
  imageUrls: [{ type: String, required: true }],
  purchaseLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Phone', phoneSchema);
