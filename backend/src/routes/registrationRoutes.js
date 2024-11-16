const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const registrationController = require('../controllers/registrationController');

// Route for creating a registration
router.post('/', auth, registrationController.createRegistration);

module.exports = router;
