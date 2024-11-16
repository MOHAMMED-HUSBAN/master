// scripts/seedSubscriptions.js
const mongoose = require('mongoose');
const Subscription = require('../src/models/Subscription');
require('dotenv').config();

const subscriptionsData = [
  {
    name: '3months',
    price: 45,
    includesUniform: true,
    durationInMonths: 3,
    description: 'اشتراك 3 اشهر + بدلة تايكواندو'
  },
  {
    name: '2months',
    price: 35,
    includesUniform: true,
    durationInMonths: 2,
    description: 'اشتراك شهرين + بدلة تايكواندو'
  },
  {
    name: '1month',
    price: 15,
    includesUniform: false,
    durationInMonths: 1,
    description: 'اشتراك شهر'
  }
];

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    
    try {
      // Clear existing subscriptions
      await Subscription.deleteMany({});
      console.log('Cleared existing subscriptions');

      // Add new subscriptions
      const result = await Subscription.insertMany(subscriptionsData);
      console.log('Added subscriptions:', result);
    } catch (error) {
      console.error('Error seeding data:', error);
    }
    
    mongoose.disconnect();
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));