const News = require('../models/News');

// Get all news articles
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching news' });
    }
};

// Add a new news article
exports.addNews = async (req, res) => {
    try {
        const { title, summary, imageUrl, sourceLink } = req.body;
        const news = await News.create({ title, summary, imageUrl, sourceLink });
        res.status(201).json(news);
    } catch (err) {
        res.status(400).json({ message: 'Error adding news' });
    }
};

// Delete a news article
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.json({ message: 'News deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting news' });
    }
}; 