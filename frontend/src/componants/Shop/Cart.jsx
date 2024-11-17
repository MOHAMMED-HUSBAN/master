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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-800 to-gray-900">
      <div className="h-20"></div>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ color: 'white', mb: 6, textAlign: 'center' }}>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(128,128,128,0.1))',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
              Your cart is empty
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/shop')}
              sx={{ 
                background: 'linear-gradient(to right, rgba(128,128,128,0.3), rgba(64,64,64,0.3))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  background: 'linear-gradient(to right, rgba(128,128,128,0.4), rgba(64,64,64,0.4))'
                }
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <Card key={item._id} sx={{ 
                  mb: 3,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(128,128,128,0.1))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ 
                          position: 'relative',
                          paddingTop: '100%',
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Box sx={{ pl: { sm: 2 } }}>
                          <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                            {item.product.name}
                          </Typography>
                          <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                            ${item.product.price}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 2,
                            mb: 2
                          }}>
                            <IconButton 
                              onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                              sx={{ 
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ color: 'white', mx: 2 }}>
                              {item.quantity}
                            </Typography>
                            <IconButton 
                              onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                              sx={{ 
                                color: 'white',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>

                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Typography variant="h6" sx={{ color: 'white' }}>
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </Typography>
                            <IconButton 
                              onClick={() => handleRemoveItem(item._id)}
                              sx={{ 
                                color: 'rgba(255,0,0,0.7)',
                                '&:hover': { color: 'rgba(255,0,0,0.9)' }
                              }}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(128,128,128,0.1))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                position: 'sticky',
                top: '100px'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                    Order Summary
                  </Typography>
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mb: 2,
                      color: 'rgba(255,255,255,0.7)'
                    }}>
                      <Typography>Subtotal</Typography>
                      <Typography>${calculateTotal()}</Typography>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      mb: 2,
                      color: 'rgba(255,255,255,0.7)'
                    }}>
                      <Typography>Shipping</Typography>
                      <Typography>Free</Typography>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      <Typography>Total</Typography>
                      <Typography>${calculateTotal()}</Typography>
                    </Box>
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={handleCheckout}
                    sx={{
                      background: 'linear-gradient(to right, rgba(128,128,128,0.3), rgba(64,64,64,0.3))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      py: 1.5,
                      '&:hover': {
                        background: 'linear-gradient(to right, rgba(128,128,128,0.4), rgba(64,64,64,0.4))'
                      }
                    }}
                  >
                    Proceed to Checkout
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
            sx={{ 
              bgcolor: snackbar.severity === 'success' ? 'rgba(46, 125, 50, 0.9)' : 'rgba(211, 47, 47, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default Cart;