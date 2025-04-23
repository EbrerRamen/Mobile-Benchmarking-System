const Phone = require('../models/Phone');
const Rating = require('../models/Rating');
const Wishlist = require('../models/wishlist')
const Notification = require('../models/Notification')
// Admin: Add Phone
exports.addPhone = async (req, res) => {
  try {
    const phone = await Phone.create(req.body);
    res.status(201).json(phone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// // Admin: Update Phone (Abrar)
// exports.updatePhone = async (req, res) => {
//   try {
//     const updatedPhone = await Phone.findByIdAndUpdate(
//       req.params.id,
//       req.body, 
//       { new: true, runValidators: true }
//     );
//     if (!updatedPhone) {
//       return res.status(404).json({ error: 'Phone not found' });
//     }
//     res.json(updatedPhone);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// Admin: Update Phone (Torsha)
exports.updatePhone = async (req, res) => {
  const { id } = req.params
  const updates = req.body

  // fetch current phone first
  const oldPhone = await Phone.findById(id)
  if (!oldPhone) return res.status(404).json({ message: 'Phone not found' })

  const oldPrice = oldPhone.price
  const newPrice = updates.price

  // apply your updates
  const updated = await Phone.findByIdAndUpdate(id, updates, { new: true })

  // if price actually changed, notify everyone who wished it
  if (newPrice != null && newPrice !== oldPrice) {
    const wishers = await Wishlist.find({ phone: id })
    const notes = wishers.map(w => ({
      user: w.user,
      message: `${oldPhone.name} price changed: $${oldPrice} → $${newPrice}`
    }))
    await Notification.insertMany(notes)
  }

  res.json(updated)
}

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
    const {
      search,
      brand,
      sort,
      minPrice,
      maxPrice,
      minRam,
      minStorage,
      minBattery,
      minRefreshRate,
      minCamera,
      os,
      network,
      // sortByValueScore,
    } = req.query;

    const query = {};

    // Search by name or processor
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'features.processor.name': { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by brand
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by minimum RAM
    if (minRam) {
      query['features.memory.ram'] = { $gte: Number(minRam) };
    }

    // Filter by minimum Storage
    if (minStorage) {
      query['features.memory.storage'] = { $gte: Number(minStorage) };
    }

    // Filter by battery capacity
    if (minBattery) {
      query['features.battery.capacity'] = { $gte: Number(minBattery) };
    }

    // Filter by display refresh rate
    if (minRefreshRate) {
      query['features.display.refreshRate'] = { $gte: Number(minRefreshRate) };
    }

    // Filter by camera quality (main camera)
    if (minCamera) {
      query['features.camera.main'] = { $gte: Number(minCamera) };
    }

    // Filter by OS
    if (os) {
      query['features.os'] = { $regex: os, $options: 'i' };
    }

    // Filter by network type (like 5G, 4G)
    if (network) {
      const networks = Array.isArray(network) ? network : [network];
      query.$or = networks.map((net) => ({
        'features.network': { $regex: new RegExp(net, 'i') }
      }));
    }

    let phonesQuery = Phone.find(query);

    // Sorting
    if (sort) {
      phonesQuery = phonesQuery.sort({ price: sort === 'asc' ? 1 : -1 });
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
      { $limit: 6 },
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
      // brand: currentPhone.brand,
      price: {
        $gte: currentPhone.price - 100, 
        $lte: currentPhone.price + 100,
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
      .slice(0, 5);

    res.status(200).json(topPhones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Benchmark two phones

exports.benchmarkPhones = async (req, res) => {
  try {
    const { phoneAId, phoneBId } = req.query;

    const [phoneA, phoneB] = await Promise.all([
      Phone.findById(phoneAId).lean({ virtuals: true }),
      Phone.findById(phoneBId).lean({ virtuals: true })
    ]);

    if (!phoneA || !phoneB) {
      return res.status(404).json({ message: 'One or both phones not found' });
    }

    const weights = {
      performance: 0.25,
      ram: 0.1,
      storage: 0.05,
      battery: 0.1,
      display: 0.1,
      camera: 0.15,
      value: 0.1,
      chargingSpeed: 0.05,
      cores: 0.05,
      clockSpeed: 0.05
    };

    const normalize = (a, b) => {
      const max = Math.max(a, b);
      return max === 0 ? [0, 0] : [a / max, b / max];
    };

    const raw = {
      performance: [phoneA.features?.processor?.benchmarkScore || 0, phoneB.features?.processor?.benchmarkScore || 0],
      ram: [phoneA.features?.memory?.ram || 0, phoneB.features?.memory?.ram || 0],
      storage: [phoneA.features?.memory?.storage || 0, phoneB.features?.memory?.storage || 0],
      battery: [phoneA.features?.battery?.capacity || 0, phoneB.features?.battery?.capacity || 0],
      display: [phoneA.features?.display?.refreshRate || 0, phoneB.features?.display?.refreshRate || 0],
      camera: [phoneA.features?.camera?.main || 0, phoneB.features?.camera?.main || 0],
      chargingSpeed: [phoneA.features?.battery?.chargingSpeed || 0, phoneB.features?.battery?.chargingSpeed || 0],
      cores: [phoneA.features?.processor?.cores || 0, phoneB.features?.processor?.cores || 0],
      clockSpeed: [phoneA.features?.processor?.clockSpeed || 0, phoneB.features?.processor?.clockSpeed || 0],
      value: [phoneA.valueScore || 0, phoneB.valueScore || 0]
    };

    const normalized = {};
    for (const key in raw) {
      normalized[key] = normalize(raw[key][0], raw[key][1]);
    }

    const calcScore = (norm) => Object.entries(weights)
      .reduce((sum, [key, weight]) => sum + norm[key][0] * weight, 0);

    const scoreA = calcScore(normalized);
    const scoreB = Object.entries(weights)
      .reduce((sum, [key, weight]) => sum + normalized[key][1] * weight, 0);

    const breakdown = {};
    for (const key in weights) {
      breakdown[key] = {
        phoneA: normalized[key][0].toFixed(2),
        phoneB: normalized[key][1].toFixed(2)
      };
    }

    const winner = scoreA > scoreB ? phoneA : scoreB > scoreA ? phoneB : null;
    const analysis = [];

    for (const key in weights) {
      const valA = normalized[key][0];
      const valB = normalized[key][1];
      if (valA !== valB) {
        const better = valA > valB ? phoneA.name : phoneB.name;
        const reason = key.charAt(0).toUpperCase() + key.slice(1);
        analysis.push(`${better} has better ${reason}.`);
      }
    }

    res.status(200).json({
      phoneA: {
        name: phoneA.name,
        score: scoreA.toFixed(2),
        imageUrls: phoneA.imageUrls && phoneA.imageUrls.length > 0 ? phoneA.imageUrls : ['https://via.placeholder.com/200'],
        processor: phoneA.features?.processor?.name || 'N/A',
        ram: phoneA.features?.memory?.ram || 'N/A',
        storage: phoneA.features?.memory?.storage || 'N/A',
        battery: phoneA.features?.battery?.capacity || 'N/A',
        display: phoneA.features?.display?.type || 'N/A',
        camera: `Main: ${phoneA.features?.camera?.main} MP, UltraWide: ${phoneA.features?.camera?.ultraWide || 'N/A'} MP, Front: ${phoneA.features?.camera?.front || 'N/A'} MP`,
        chargingSpeed: phoneA.features?.battery?.chargingSpeed || 'N/A',
        cores: phoneA.features?.processor?.cores || 'N/A',
        clockSpeed: phoneA.features?.processor?.clockSpeed || 'N/A',
        performanceScore: phoneA.features?.processor?.benchmarkScore || 'N/A',
        price: phoneA.price || 'N/A',

      },
      phoneB: {
        name: phoneB.name,
        score: scoreB.toFixed(2),
        imageUrls: phoneB.imageUrls && phoneB.imageUrls.length > 0 ? phoneB.imageUrls : ['https://via.placeholder.com/200'],
        processor: phoneB.features?.processor?.name || 'N/A',
        ram: phoneB.features?.memory?.ram || 'N/A',
        storage: phoneB.features?.memory?.storage || 'N/A',
        battery: phoneB.features?.battery?.capacity || 'N/A',
        display: phoneB.features?.display?.type || 'N/A',
        camera: `Main: ${phoneB.features?.camera?.main} MP, UltraWide: ${phoneB.features?.camera?.ultraWide || 'N/A'} MP, Front: ${phoneB.features?.camera?.front || 'N/A'} MP`,
        chargingSpeed: phoneB.features?.battery?.chargingSpeed || 'N/A',
        cores: phoneB.features?.processor?.cores || 'N/A',
        clockSpeed: phoneB.features?.processor?.clockSpeed || 'N/A',
        performanceScore: phoneB.features?.processor?.benchmarkScore || 'N/A',
        price: phoneB.price || 'N/A',

      },
      verdict: winner ? `${winner.name} wins` : 'It’s a tie!',
      winner: winner ? { _id: winner._id, name: winner.name } : null,
      analysis
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



