const express = require('express');
const { getNews } = require('../controllers/newsController');
const router = express.Router();

// Route to fetch all news
router.get('/news', getNews);

module.exports = router;
