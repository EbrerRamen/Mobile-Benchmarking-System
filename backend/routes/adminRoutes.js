const express = require('express');
const admin = require('../config/firebase');

const router = express.Router();

// Set admin claim for a user
router.post('/setAdmin/:uid', async (req, res) => {
  const uid = req.params.uid;

  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    res.status(200).send(`Admin role assigned to user: ${uid}`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
    res.status(500).send('Failed to assign admin role');
  }
});

module.exports = router;
