// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const User = require('../models/User');

// الحصول على جميع المنتجات
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// الحصول على منتج محدد
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// الحصول على المنتجات حسب الفئة
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// إضافة مراجعة جديدة
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.id;

    console.log('Adding review:', { productId: req.params.id, rating, comment, userId });

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // التحقق مما إذا كان المستخدم قد قام بالمراجعة مسبقاً
    const existingReview = product.reviews.find(
      review => review.user.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const review = {
      user: userId,
      rating,
      comment,
      userName: user.username || user.email,
      createdAt: new Date()
    };

    product.reviews.push(review);
    product.calculateAverageRating();
    
    const savedProduct = await product.save();
    console.log('Review added successfully:', review);
    
    // إرجاع المنتج المحدث مع المراجعات
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate('reviews.user', 'username email')
      .populate('favorites');
      
    res.json(populatedProduct);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// إضافة/إزالة من المفضلة
router.post('/:id/favorite', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const isFavorite = product.favorites.includes(req.user.id);
    if (isFavorite) {
      // إزالة من المفضلة
      product.favorites = product.favorites.filter(
        userId => userId.toString() !== req.user.id
      );
    } else {
      // إضافة إلى المفضلة
      product.favorites.push(req.user.id);
    }

    await product.save();
    res.json({ 
      isFavorite: !isFavorite,
      favoritesCount: product.favorites.length 
    });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// الحصول على المنتجات المفضلة للمستخدم
router.get('/favorites/user', auth, async (req, res) => {
  try {
    const products = await Product.find({
      favorites: req.user.id
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching favorite products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
