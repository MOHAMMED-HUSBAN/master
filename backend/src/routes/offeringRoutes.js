const express = require('express');
const router = express.Router();
const { getOfferings, createOffering } = require('../controllers/offeringController');

// Get all offerings
router.get('/offerings', getOfferings);

// Create a new offering
router.post('/', createOffering);

module.exports = router;
