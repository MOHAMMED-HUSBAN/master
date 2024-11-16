const Subscription = require('../models/Subscription');
const UserSubscription = require('../models/UserSubscription');
const User = require('../models/User');
const paypal = require('@paypal/checkout-server-sdk');

// PayPal configuration
let clientId = "YOUR_PAYPAL_CLIENT_ID";
let clientSecret = "YOUR_PAYPAL_CLIENT_SECRET";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

const subscriptionController = {
  // Get all available subscriptions
  getAllSubscriptions: async (req, res) => {
    try {
      const subscriptions = await Subscription.find();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create PayPal order
  createPayPalOrder: async (req, res) => {
    try {
      const { subscriptionId } = req.body;
      const subscription = await Subscription.findById(subscriptionId);
      
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: "USD",
            value: subscription.price.toString()
          },
          description: `${subscription.name} Taekwondo Subscription`
        }]
      });

      const order = await client.execute(request);
      res.json({ orderId: order.result.id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Capture PayPal payment and create subscription
  capturePayment: async (req, res) => {
    try {
      const { orderId, subscriptionId } = req.body;
      const userId = req.user.id; // From auth middleware

      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      const capture = await client.execute(request);

      if (capture.result.status === "COMPLETED") {
        const subscription = await Subscription.findById(subscriptionId);
        
        // Calculate end date based on subscription duration
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + subscription.durationInMonths);

        const userSubscription = new UserSubscription({
          userId,
          subscriptionId,
          startDate,
          endDate,
          paymentStatus: 'completed',
          paypalOrderId: orderId
        });

        await userSubscription.save();
        res.json({ 
          message: "Subscription activated successfully",
          subscription: userSubscription 
        });
      } else {
        res.status(400).json({ message: "Payment failed" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user's active subscriptions
  getUserSubscriptions: async (req, res) => {
    try {
      const userId = req.user.id;
      const subscriptions = await UserSubscription.find({ 
        userId,
        endDate: { $gte: new Date() }
      }).populate('subscriptionId');
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = subscriptionController;
