
// Backend: New profile routes (routes/profile.js)
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

router.get('/', auth, profileController.getProfile);
router.put('/', auth, profileController.updateProfile);
router.get('/programs', auth, profileController.getUserPrograms);

module.exports = router;