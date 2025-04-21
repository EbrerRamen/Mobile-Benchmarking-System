const Phone = require('../models/Phone');
const Rating = require('../models/Rating');
// Admin: Add Phone
exports.addPhone = async (req, res) => {
  try {
    const phone = await Phone.create(req.body);
    res.status(201).json(phone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Update Phone
exports.updatePhone = async (req, res) => {
  try {
    const updatedPhone = await Phone.findByIdAndUpdate(
      req.params.id,
      req.body, 
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

// Get All Phones (with search, filter, sort)
exports.getPhones = async (req, res) => {
  try {
    const { search, brand, sort } = req.query;
    const query = {};

    // Search by phone name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by brand
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    let phonesQuery = Phone.find(query);

    // Sort by price
    if (sort === 'asc') {
      phonesQuery = phonesQuery.sort({ price: 1 });
    } else if (sort === 'desc') {
      phonesQuery = phonesQuery.sort({ price: -1 });
    }

    const phones = await phonesQuery.lean({ virtuals: true });
    res.status(200).json(phones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Phone Details
exports.getPhoneDetails = async (req, res) => {
  const { phoneId } = req.params;

  try {
    const phone = await Phone.findById(phoneId).lean({ virtuals: true });
    if (!phone) {
      return res.status(404).json({ error: 'Phone not found' });
    }

    res.status(200).json(phone); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Trending Phones
exports.getTrendingPhones = async (req, res) => {
  try {
    const topPhones = await Rating.aggregate([
      {
        $group: {
          _id: '$phone',
          avgCamera: { $avg: '$ratings.camera' },
          avgBattery: { $avg: '$ratings.battery' },
          avgDisplay: { $avg: '$ratings.display' },
          avgProcessor: { $avg: '$ratings.processor' },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          phone: '$_id',
          _id: 0,
          averageRating: {
            $avg: [
              '$avgCamera',
              '$avgBattery',
              '$avgDisplay',
              '$avgProcessor'
            ]
          },
          count: 1
        }
      },
      {
        $match: {
          averageRating: { $gte: 4.0 },
          count: { $gte: 5 }
        }
      },
      { $sort: { averageRating: -1, count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'phones',
          localField: 'phone',
          foreignField: '_id',
          as: 'phoneDetails'
        }
      },
      { $unwind: '$phoneDetails' },
      {
        $project: {
          _id: 0,
          phone: '$phoneDetails',
          averageRating: 1,
          count: 1
        }
      }
    ]);

    res.status(200).json(topPhones);
  } catch (error) {
    console.error('Error fetching trending phones:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Show similar phones
exports.getRelatedPhones = async (req, res) => {
  try {
    const phoneId = req.params.id;
    const currentPhone = await Phone.findById(phoneId);

    if (!currentPhone) {
      return res.status(404).json({ error: "Phone not found" });
    }

    const relatedPhones = await Phone.find({
      _id: { $ne: phoneId },
      brand: currentPhone.brand,
      price: {
        $gte: currentPhone.price - 2000, 
        $lte: currentPhone.price + 2000,
      },
    }).limit(5);

    res.status(200).json(relatedPhones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Value for money
exports.getTopValuePhones = async (req, res) => {
  try {
    const phones = await Phone.find();

    const topPhones = phones
      .filter(phone => phone.valueScore > 0 && phone.price)
      .sort((a, b) => b.valueScore - a.valueScore)
      .slice(0, 10);

    res.status(200).json(topPhones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

