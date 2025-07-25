const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    imageUrl: { type: String },
    sourceLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema); 