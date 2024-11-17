import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from "../../slice/cartSlice";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.cart.loading);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      await dispatch(updateCartItem({ itemId, quantity: newQuantity })).unwrap();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'فشل تحديث الكمية',
        severity: 'error'
      });
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
      setSnackbar({
        open: true,
        message: 'تم إزالة المنتج من السلة',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'فشل إزالة المنتج',
        severity: 'error'
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    ).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.product.name,
                images: [item.product.image]
              },
              unit_amount: Math.round(item.product.price * 100)
            },
            quantity: item.quantity
          }))
        })
      });

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.error('Checkout error:', error);
      setSnackbar({
        open: true,
        message: 'حدث خطأ في عملية الدفع',
        severity: 'error'
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        سلة التسوق
      </Typography>

      {cartItems.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            السلة فارغة
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/shop')}
            sx={{ mt: 2 }}
          >
            تسوق الآن
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        style={{ width: '100%', maxWidth: '100px', height: 'auto' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6">{item.product.name}</Typography>
                      <Typography color="textSecondary">
                        ${item.product.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box display="flex" alignItems="center">
                        <IconButton 
                          onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <IconButton 
                          onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} container justifyContent="flex-end">
                      <IconButton 
                        onClick={() => handleRemoveItem(item._id)}
                        color="error"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ملخص الطلب
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography>المجموع:</Typography>
                  <Typography>${calculateTotal()}</Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={handleCheckout}
                >
                  إتمام الشراء
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;