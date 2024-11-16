const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const registrationController = require('../controllers/RegistrationController');

// Route for creating a registration
router.post('/', auth, registrationController.createRegistration);
router.get('/user', auth, registrationController.getUserRegistrations);

module.exports = router;
