const Notification = require('../models/Notification')

// POST /api/notifications
exports.addNotification = async (req, res) => {
  const { user, message } = req.body
  if (!user || !message) return res.status(400).json({ message: 'Missing fields' })
  const note = await Notification.create({ user, message })
  res.status(201).json(note)
}

// GET /api/notifications?user=<uid>
exports.getNotifications = async (req, res) => {
  const { user } = req.query
  if (!user) return res.status(400).json({ message: 'Missing user' })
  const notes = await Notification.find({ user }).sort('-createdAt')
  res.json(notes)
}

// PUT /api/notifications/:id/read
exports.markRead = async (req, res) => {
  const note = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  )
  if (!note) return res.status(404).json({ message: 'Not found' })
  res.json(note)
}