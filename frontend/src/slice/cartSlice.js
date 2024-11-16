
// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${API_URL}/cart`, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { getState }) => {
  const token = getState().auth.token; // تأكد من أن لديك توكن في الحالة
  const response = await axios.post(`${API_URL}/cart/add`, { productId, quantity }, {
    headers: { 'x-auth-token': token }
  });
  return response.data; // تأكد من أن الاستجابة تحتوي على بيانات صحيحة
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, quantity }, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.put(`${API_URL}/cart/update/${itemId}`, { quantity }, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.delete(`${API_URL}/cart/remove/${itemId}`, {
    headers: { 'x-auth-token': token }
  });
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items; // تأكد من أن payload صحيح
      })
      
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      });
  },
});

export default cartSlice.reducer;