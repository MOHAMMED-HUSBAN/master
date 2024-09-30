const News = require('../models/newsModel');

// Fetch all news
const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news' });
  }
};

module.exports = {
  getNews
};
