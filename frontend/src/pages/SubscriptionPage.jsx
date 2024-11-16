import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { subscriptionService } from '../services/subscriptionService';

const Alert = ({ type, title, message }) => (
  <div className={`p-4 mb-4 rounded-lg ${
    type === 'error' ? 'bg-red-50 text-red-800 border border-red-300' :
    type === 'success' ? 'bg-green-50 text-green-800 border border-green-300' :
    'bg-blue-50 text-blue-800 border border-blue-300'
  }`}>
    <h3 className="font-bold mb-1">{title}</h3>
    <p>{message}</p>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

const SubscriptionCard = ({ plan, isSelected, onSelect, loading }) => (
  <div className={`bg-white rounded-lg shadow-md transition-all duration-300 ${
    isSelected ? 'ring-2 ring-blue-500' : ''
  }`}>
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">{plan.name}</h2>
      <p className="text-3xl font-bold mb-4">${plan.price}</p>
      {plan.includesUniform && (
        <p className="text-green-600 mb-4">تشمل بدلة التايكوندو</p>
      )}
      <p className="mb-6">{plan.durationInMonths} شهر</p>
      <button
        onClick={() => onSelect(plan)}
        disabled={loading}
        className={`w-full px-4 py-2 rounded transition-colors duration-300 
          ${isSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'جاري المعالجة...' : 'اختيار الخطة'}
      </button>
    </div>
  </div>
);

const PaymentSection = ({ selectedPlan, onPaymentSuccess, onPaymentError }) => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const createPayPalOrder = async () => {
    try {
      setPaymentProcessing(true);
      const { orderId } = await subscriptionService.createPayPalOrder(selectedPlan._id);
      return orderId;
    } catch (error) {
      onPaymentError(error.message);
      return null;
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handlePaymentApproval = async (data) => {
    try {
      setPaymentProcessing(true);
      const result = await subscriptionService.capturePayment(data.orderID, selectedPlan._id);
      onPaymentSuccess(result.subscription);
    } catch (error) {
      onPaymentError(error.message);
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="mt-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-center mb-4">إكمال الدفع</h3>
      {paymentProcessing && <LoadingSpinner />}
      <PayPalScriptProvider options={{ 
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD"
      }}>
        <PayPalButtons
          createOrder={createPayPalOrder}
          onApprove={handlePaymentApproval}
          style={{ layout: "vertical" }}
          disabled={paymentProcessing}
        />
      </PayPalScriptProvider>
    </div>
  );
};

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    const initializePage = async () => {
      try {
        setLoading(true);
        // Fetch subscriptions and user's active subscription in parallel
        const [subscriptionsData, userSubscriptionData] = await Promise.all([
          subscriptionService.getAllSubscriptions(),
          subscriptionService.getUserSubscription()
        ]);
        
        setSubscriptions(subscriptionsData);
        if (userSubscriptionData && userSubscriptionData.length > 0) {
          setActiveSubscription(userSubscriptionData[0]);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error initializing page:', error);
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, []);

  const handleSubscriptionSelect = (plan) => {
    setSelectedPlan(plan);
    setError(null);
    setSuccessMessage(null);
  };

  const handlePaymentSuccess = (subscription) => {
    setActiveSubscription(subscription);
    setSelectedPlan(null);
    setSuccessMessage('تم تفعيل الاشتراك بنجاح!');
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8" style={{ direction: 'rtl' }}>
      <h1 className="text-3xl font-bold text-center mb-8">خطط اشتراك التايكوندو</h1>
      
      {error && (
        <Alert 
          type="error"
          title="خطأ"
          message={error}
        />
      )}

      {successMessage && (
        <Alert 
          type="success"
          title="تم بنجاح"
          message={successMessage}
        />
      )}

      {activeSubscription && (
        <Alert 
          type="info"
          title="اشتراك نشط"
          message={`لديك اشتراك نشط حتى ${new Date(activeSubscription.endDate).toLocaleDateString('ar-EG')}`}
        />
      )}

      {subscriptions.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد خطط اشتراك متاحة حالياً</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptions.map((plan) => (
              <SubscriptionCard
                key={plan._id}
                plan={plan}
                isSelected={selectedPlan?._id === plan._id}
                onSelect={handleSubscriptionSelect}
                loading={loading}
              />
            ))}
          </div>

          {selectedPlan && (
            <PaymentSection
              selectedPlan={selectedPlan}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SubscriptionPage;