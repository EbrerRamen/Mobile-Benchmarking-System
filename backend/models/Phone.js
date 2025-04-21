const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number }, // in BDT or USD

  features: {
    camera: {
      main: { type: Number },      // in MP
      ultraWide: { type: Number }, // optional, in MP
      front: { type: Number },     // in MP
      videoRecording: { type: String }, // e.g., "4K@60fps"
    },
    battery: {
      capacity: { type: Number },      // in mAh
      chargingSpeed: { type: Number }, // in Watts
      type: { type: String },          // e.g., "Li-Po"
    },
    display: {
      size: { type: Number },        // in inches
      type: { type: String },        // AMOLED, IPS, etc.
      resolution: { type: String },  // e.g., "1080x2400"
      refreshRate: { type: Number }, // 60, 90, 120 Hz
    },
    processor: {
      name: { type: String },       // e.g., "Snapdragon 695"
      benchmarkScore: { type: Number }, // Geekbench or custom scale
      cores: { type: Number },      // e.g., 8
      clockSpeed: { type: Number }, // in GHz
    },
    memory: {
      ram: { type: Number },        // in GB
      storage: { type: Number },    // in GB
      storageType: { type: String },// UFS 3.1, eMMC, etc.
      expandable: { type: Boolean },
    },
    os: { type: String },           // e.g., "Android 13"
    network: [{ type: String }],    // e.g., ["4G", "5G"]
    sim: { type: String },          // e.g., "Dual SIM"
    dimensions: { type: String },
    weight: { type: Number },       // in grams
  },

  imageUrls: [{ type: String, required: true }],
  purchaseLink: { type: String },


}, { timestamps: true });

phoneSchema.virtual('valueScore').get(function () {
  const features = this.features;

  const cameraScore = (features?.camera?.main || 0) * 0.4;
  const batteryScore = (features?.battery?.capacity || 0) / 100;
  const refreshRateScore = (features?.display?.refreshRate || 60) * 0.2;
  const processorScore = (features?.processor?.benchmarkScore || 0) * 1.2;
  const ramScore = (features?.memory?.ram || 0) * 5;
  const storageScore = (features?.memory?.storage || 0) * 0.5;

  const specScore =
    cameraScore +
    batteryScore +
    refreshRateScore +
    processorScore +
    ramScore +
    storageScore;

  const price = this.price || 1;
  return Number((specScore / price).toFixed(2));
});

// Make sure virtuals show up in JSON & Object responses
phoneSchema.set('toObject', { virtuals: true });
phoneSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('Phone', phoneSchema);
