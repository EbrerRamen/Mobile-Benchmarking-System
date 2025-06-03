const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables first
dotenv.config();

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in environment variables');
  process.exit(1);
}

const connectDB = require('./config/db');
const phoneRoutes = require('./routes/phoneRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const FaqRoutes = require('./routes/FaqRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Connect to MongoDB
connectDB();

// App setup
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://mobile-benchmarking-frontend.onrender.com'],
  credentials: true
}));
app.use(express.json()); // Parse incoming JSON requests automatically

app.use('/api/phones', phoneRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/faqs', FaqRoutes);
app.use('/api/news', newsRoutes);

// Start the server
const port = process.env.PORT || 1080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
