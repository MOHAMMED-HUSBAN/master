const mongoose = require('mongoose');
const Cart = require('../src/models/Cart'); // Adjust the path as needed
const User = require('../src/models/User'); // Adjust the path as needed
const Product = require('../src/models/Product'); // Adjust the path as needed

// Connect to your MongoDB Atlas database
const mongoURI = 'mongodb+srv://mohammedalhusban1:tm12YmQqa6YnhVbk@academy.5zogf.mongodb.net/academy?retryWrites=true&w=majority&appName=academy'; // Replace with your actual MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));
// Sample data
const userId = new mongoose.Types.ObjectId("66f95213b8de3fa39fc07e92"); // Existing User ID
const productId = new mongoose.Types.ObjectId("66fed8afef96044ad1464b9b"); // Existing Product ID

// Sample cart data
const cartData = {
  user: userId,
  items: [
    {
      product: productId,
      quantity: 1 // Set the desired quantity
    }
  ]
};

// Function to seed data
const seedCart = async () => {
  try {
    // Delete existing carts for the user
    await Cart.deleteMany({ user: userId });

    // Insert cart
    const cart = new Cart(cartData);
    await cart.save();
    console.log('Cart seeded:', cart);
  } catch (error) {
    console.error('Error seeding cart data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Call the seed function
seedCart();