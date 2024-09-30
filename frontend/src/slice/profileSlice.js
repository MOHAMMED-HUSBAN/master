// Frontend: Updated profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProfile = createAsyncThunk('profile/getProfile', async (_, { getState }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/profile`, config);
  return response.data;
});

export const updateProfile = createAsyncThunk('profile/updateProfile', async (userData, { getState }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  const response = await axios.put(`${API_URL}/profile`, userData, config);
  return response.data;
});


const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;