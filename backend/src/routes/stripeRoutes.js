const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');

router.post('/create-checkout-session', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId: req.user.id,
        username: user.username,
        phonenumber: user.phonenumber
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ message: 'حدث خطأ في إنشاء جلسة الدفع' });
  }
});

router.get('/verify-payment/:sessionId', auth, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    
    if (session.payment_status === 'paid') {
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const order = new Order({
        userId: req.user.id,
        username: session.metadata.username,
        phonenumber: session.metadata.phonenumber,
        items: cart.items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        amount: session.amount_total / 100,
        status: 'completed',
        paymentId: session.payment_intent
      });

      await order.save();
      console.log('Order saved:', order);
      cart.items = [];
      await cart.save();
      
      res.json({ 
        success: true,
        message: 'تم الدفع بنجاح',
        orderId: order._id
      });
    } else {
      res.json({ 
        success: false,
        message: 'لم يتم اكتمال الدفع'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'حدث خطأ في التحقق من الدفع' });
  }
});

// الحصول على طلبات المستخدم
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ message: 'حدث خطأ في جلب الطلبات' });
  }
});

module.exports = router; 