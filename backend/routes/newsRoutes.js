const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add news
router.post('/', async (req, res) => {
    const { title, summary, imageUrl, sourceLink } = req.body;

    try {
        const newNews = new News({
            title,
            summary,
            imageUrl,
            sourceLink
        });
        await newNews.save();
        res.status(201).json(newNews);
    } catch (err) {
        res.status(400).json({ message: 'Could not create news' });
    }
});

// Update news
router.put('/:id', async (req, res) => {
    const { title, summary, imageUrl, sourceLink } = req.body;

    try {
        const news = await News.findByIdAndUpdate(
            req.params.id,
            { title, summary, imageUrl, sourceLink },
            { new: true }
        );
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json(news);
    } catch (err) {
        res.status(400).json({ message: 'Could not update news' });
    }
});

// Delete news
router.delete('/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json({ message: 'News deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting news' });
    }
});

module.exports = router; 