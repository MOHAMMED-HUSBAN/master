// src/routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const { createRegistration } = require('../controllers/RegistrationController');

router.post('/registrations', createRegistration);

module.exports = router;
