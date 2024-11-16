import axios from 'axios';

const API_URL = 'http://localhost:5000/api/subscriptions';

export const subscriptionService = {
  createSubscription: async (programId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/create`,
      { programId },
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    return response.data;
  },

  processPayment: async (subscriptionId, paymentDetails) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/process-payment`,
      {
        subscriptionId,
        paymentId: paymentDetails.orderID
      },
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    return response.data;
  },

  getUserSubscriptions: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_URL}/user-subscriptions`,
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    return response.data;
  }
}; 