import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
  Alert
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { clearCart } from '../../slice/cartSlice';
import axios from 'axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/verify-payment/${sessionId}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );

      if (response.data.success) {
        await dispatch(clearCart());
        setVerifying(false);
      } else {
        setError('لم يتم اكتمال عملية الدفع');
      }
    } catch (error) {
      setError('حدث خطأ في التحقق من عملية الدفع');
    }
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  if (verifying) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          جاري التحقق من عملية الدفع...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        p={3}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/cart')}
        >
          العودة إلى السلة
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
      p={3}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 400
        }}
      >
        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 60, mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          تم الدفع بنجاح!
        </Typography>
        <Typography color="textSecondary" paragraph>
          شكراً لك على الشراء. سيتم معالجة طلبك قريباً.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleContinueShopping}
            sx={{ mr: 2 }}
          >
            متابعة التسوق
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/profile')}
          >
            عرض الطلبات
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess; 