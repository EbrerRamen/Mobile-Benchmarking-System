const Wishlist = require('../models/wishlist')

exports.addToWishlist = async (req, res) => {
  const { user, phone } = req.body
  if (!user || !phone) return res.status(400).json({ message: 'Missing fields' })
  if (await Wishlist.findOne({ user, phone }))
    return res.status(400).json({ message: 'Already in wishlist' })
  const item = await Wishlist.create({ user, phone })
  res.status(201).json(item)
}

exports.removeFromWishlist = async (req, res) => {
  try {
    const item = await Wishlist.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Removed', id: req.params.id })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getWishlist = async (req, res) => {
  const { user } = req.query
  if (!user) return res.status(400).json({ message: 'Missing user' })
  const items = await Wishlist.find({ user }).populate('phone')
  res.json(items)
}