const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
  user:  { type: String, required: true },
  phone: { type: mongoose.Schema.Types.ObjectId, ref: 'Phone', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Wishlist', wishlistSchema)