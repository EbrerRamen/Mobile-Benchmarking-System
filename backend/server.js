const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const phoneRoutes = require('./routes/phoneRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const FaqRoutes = require('./routes/FaqRoutes');

dotenv.config(); // Loads variables from .env
connectDB(); // Connects to MongoDB

// App setup
const app = express();
app.use(cors(
    {
        origin: ["https://mobile-benchmarking-system-frontend.vercel.app"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
)); // Allows frontend apps to access this backend
app.use(express.json()); // Parse incoming JSON requests automatically

app.use('/api/phones', phoneRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/faqs', FaqRoutes);

// Start the server
const PORT = process.env.PORT || 1080;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`)); // Activates the server
