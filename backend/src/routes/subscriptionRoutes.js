const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

router.post('/create', auth, subscriptionController.createSubscription);
router.post('/process-payment', auth, subscriptionController.processPayment);
router.get('/user-subscriptions', auth, subscriptionController.getUserSubscriptions);

module.exports = router; 