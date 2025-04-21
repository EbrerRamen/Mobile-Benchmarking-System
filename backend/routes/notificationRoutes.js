const express = require('express')
const { addNotification, getNotifications, markRead } = require('../controllers/notificationController')
const router = express.Router()

router.post('/',     addNotification)
router.get('/',      getNotifications)
router.put('/:id/read', markRead)

module.exports = router