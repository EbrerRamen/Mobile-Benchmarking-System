const express = require('express')
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist  // ← import it
} = require('../controllers/wishlistController')
const router = express.Router()

router.post('/add', addToWishlist)
router.get('/', getWishlist)
router.delete('/:id', removeFromWishlist)  // ← new

module.exports = router