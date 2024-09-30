// src/routes/WhatWeOffer2Routes.js
const express = require('express');
const router = express.Router();
const { getWhatWeOffer2, createWhatWeOffer2 } = require('../controllers/WhatWeOffer2Controller');

router.get('/WhatWeOffer2', getWhatWeOffer2);
router.post('/', createWhatWeOffer2);

module.exports = router;
