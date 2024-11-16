import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { subscriptionService } from '../services/subscriptionService';

const Alert = ({ type, message }) => (
  <div className={`p-4 mb-4 rounded ${
    type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
  }`}>
    {message}
  </div>
);

const SubscriptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const programData = location.state?.program;

  if (!programData) {
    return <div className="text-center p-4">برجاء اختيار برنامج للاشتراك</div>;
  }

  const handlePayment = async (paymentDetails) => {
    setLoading(true);
    try {
      // 1. Create subscription
      const subscriptionResponse = await subscriptionService.createSubscription(programData.id);
      
      // 2. Process payment
      await subscriptionService.processPayment(
        subscriptionResponse.subscription._id,
        paymentDetails
      );

      setSuccess('تم الاشتراك بنجاح!');
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في عملية الدفع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">تأكيد الاشتراك</h1>
      
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}
      {loading && <div className="text-center">جاري معالجة الطلب...</div>}

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{programData.name}</h2>
        <div className="mb-4">
          <p className="text-gray-600">السعر: ${programData.price}</p>
          <p className="text-gray-600">المدة: {programData.duration} شهر</p>
          <p className="text-gray-600">المستوى: {programData.level}</p>
        </div>

        <PayPalScriptProvider options={{ 
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID 
        }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: programData.price
                  }
                }]
              });
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              await handlePayment(order);
            }}
            onError={(err) => {
              setError('حدث خطأ في عملية الدفع');
              console.error('PayPal Error:', err);
            }}
            style={{ layout: "vertical" }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default SubscriptionPage; 