
// // routes/cartRoutes.js
// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/Cart');
// const auth = require('../middleware/auth');

// // Get user's cart
// router.get('/', auth, async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
//     if (!cart) {
//       cart = new Cart({ user: req.user.id, items: [] });
//       await cart.save();
//     }
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add item to cart
// router.post('/add', auth, async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     let cart = await Cart.findOne({ user: req.user.id });
    
//     if (!cart) {
//       cart = new Cart({ user: req.user.id, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update cart item quantity
// router.put('/update/:itemId', auth, async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const cart = await Cart.findOne({ user: req.user.id });
    
//     const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity = quantity;
//       await cart.save();
//       res.json(cart);
//     } else {
//       res.status(404).json({ message: 'Item not found in cart' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Remove item from cart
// router.delete('/remove/:itemId', auth, async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id });
//     cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
//     await cart.save();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
router.post('/add', auth, async (req, res) => {
  console.log('Add to cart route reached');
  try {
    const { productId, quantity } = req.body;

    // التحقق من وجود بيانات الطلب
    if (!productId || !quantity) {
      return res.status(400).json({ msg: 'Product ID and quantity are required' });
    }

    const userId = req.user.id;

    // Validate product exists
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Cart exists for user
      let itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        // Product does not exist in cart, add new item
        cart.items.push({ product: productId, quantity });
      }

      cart = await cart.save();
      return res.status(200).json(cart); // Use status 200 for success
    } else {
      // No cart for user, create new cart
      const newCart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error('Error in add to cart:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
});


module.exports = router;
