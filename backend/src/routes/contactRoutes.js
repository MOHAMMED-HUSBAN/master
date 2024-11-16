const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth'); // للتحقق من المصادقة

router.post('/', contactController.createContact);
router.get('/', auth, contactController.getAllContacts); // متاح فقط للمشرفين

module.exports = router; 