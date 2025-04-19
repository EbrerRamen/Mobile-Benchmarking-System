const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const phoneRoutes = require('./routes/phoneRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes')

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/phones', phoneRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT || 1080;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
