// adminRoutes.js or userRoutes.js

const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

// Initialize Firebase Admin SDK (usually done once in your backend)
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')), // Path to your service account key
});

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
