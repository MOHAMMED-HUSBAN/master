const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    console.log('Cart route - Adding to cart:', { productId, quantity, userId });

    const product = await Product.findById(productId);
    console.log('Found product:', product);

    if (!product) {
      console.log('Product not found with ID:', productId);
      return res.status(404).json({ 
        message: 'Product not found',
        productId 
      });
    }

    let cart = await Cart.findOne({ user: userId });
    console.log('Existing cart:', cart);
    
    if (cart) {
      // تحديث السلة الموجودة
      const itemIndex = cart.items.findIndex(item => 
        item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      // إنشاء سلة جديدة
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    }

    await cart.save();
    
    // تجميع السلة مع معلومات المنتجات
    const populatedCart = await Cart.findById(cart._id)
      .populate('items.product');

    console.log('Final cart:', populatedCart);
    res.json(populatedCart);
  } catch (error) {
    console.error('Add to cart error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// إضافة مسار جديد لجلب السلة
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      return res.json({ items: [] });
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Fetch cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// تحديث كمية منتج في السلة
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => 
      item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// حذف منتج من السلة
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => 
      item._id.toString() !== itemId
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// تفريغ السلة بالكامل
router.delete('/clear', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared successfully', items: [] });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
