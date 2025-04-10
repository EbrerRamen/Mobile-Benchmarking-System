const Phone = require('../models/Phone');

// Admin: Add Phone
exports.addPhone = async (req, res) => {
  try {
    // Ensure that the req.body includes the imageUrl field
    const phone = await Phone.create(req.body);
    res.status(201).json(phone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Update Phone
exports.updatePhone = async (req, res) => {
  try {
    // Update the phone using the req.body (including imageUrl)
    const updatedPhone = await Phone.findByIdAndUpdate(
      req.params.id,
      req.body, // Ensure imageUrl is included in the body if it's updated
      { new: true, runValidators: true }
    );
    if (!updatedPhone) {
      return res.status(404).json({ error: 'Phone not found' });
    }
    res.json(updatedPhone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin: Delete Phone
exports.deletePhone = async (req, res) => {
  try {
    const deletedPhone = await Phone.findByIdAndDelete(req.params.id);
    if (!deletedPhone) {
      return res.status(404).json({ error: 'Phone not found' });
    }
    res.json({ message: 'Phone deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Phones
exports.getPhones = async (req, res) => {
  try {
    const phones = await Phone.find();
    res.status(200).json(phones);  // Will include imageUrl in each phone object
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Phone Details
exports.getPhoneDetails = async (req, res) => {
  const { phoneId } = req.params;

  try {
    const phone = await Phone.findById(phoneId);
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }

    res.status(200).json(phone);  // Sends the phone object, including imageUrl
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
