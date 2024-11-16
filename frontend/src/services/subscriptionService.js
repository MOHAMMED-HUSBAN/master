// src/services/subscriptionService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const subscriptionService = {
  // Get all available subscriptions
  getAllSubscriptions: async () => {
    try {
      const response = await axios.get(`${API_URL}/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch subscriptions');
    }
  },

  // Get user's active subscription
  getUserSubscription: async () => {
    try {
      const response = await axios.get(`${API_URL}/subscriptions/user`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user subscription');
    }
  },

  // Create PayPal order
  createPayPalOrder: async (subscriptionId) => {
    try {
      const response = await axios.post(
        `${API_URL}/subscriptions/create-paypal-order`,
        { subscriptionId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create PayPal order');
    }
  },

  // Capture PayPal payment
  capturePayment: async (orderId, subscriptionId) => {
    try {
      const response = await axios.post(
        `${API_URL}/subscriptions/capture-payment`,
        { orderId, subscriptionId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to capture payment');
    }
  }
};