const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number }, 

  features: {
    camera: {
      main: { type: Number },      
      ultraWide: { type: Number }, 
      front: { type: Number },     
      videoRecording: { type: String }, 
    },
    battery: {
      capacity: { type: Number },      
      chargingSpeed: { type: Number }, 
      type: { type: String },         
    },
    display: {
      size: { type: Number },        
      type: { type: String },        
      resolution: { type: String },  
      refreshRate: { type: Number }, 
    },
    processor: {
      name: { type: String },       
      benchmarkScore: { type: Number }, 
      cores: { type: Number },      
      clockSpeed: { type: Number }, 
    },
    memory: {
      ram: { type: Number },        
      storage: { type: Number },    
      storageType: { type: String },
      expandable: { type: Boolean },
    },
    os: { type: String },          
    network: [{ type: String }],    
    sim: { type: String },          
    dimensions: { type: String },
    weight: { type: Number },       
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

phoneSchema.set('toObject', { virtuals: true });
phoneSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('Phone', phoneSchema);
