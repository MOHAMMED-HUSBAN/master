import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCart, updateCartItem, removeFromCart } from '../../slice/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleUpdateQuantity = (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      dispatch(updateCartItem({ itemId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(itemId));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  if (!user) {
    return <Typography>Please log in to view your cart.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item._id} sx={{ border: '1px solid #ddd', mb: 2, borderRadius: 2 }}>
                <ListItemText
                  primary={item.product.name}
                  secondary={`$${item.product.price.toFixed(2)} x ${item.quantity}`}
                />
                <Box>
                  <IconButton onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography component="span">{item.quantity}</Typography>
                  <IconButton onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveItem(item._id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" align="right">
            Total: ${calculateTotal()}
          </Typography>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;