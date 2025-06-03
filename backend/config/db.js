const mongoose = require('mongoose');

const connectDB = async () => { 
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI.replace(/\/\/[^:]+:[^@]+@/, '//<credentials>@')); // Log URI with credentials hidden
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }); 
    
    console.log('MongoDB Connected ✅');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
