const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

router.get('/', subscriptionController.getAllSubscriptions);
router.get('/user-subscriptions', auth, subscriptionController.getUserSubscriptions);
router.post('/create-paypal-order', auth, subscriptionController.createPayPalOrder);
router.post('/capture-payment', auth, subscriptionController.capturePayment);

module.exports = router;
