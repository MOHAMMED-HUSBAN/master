import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../../backend/src/config/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  localStorage.setItem('token', response.data.token); // Store token in localStorage
  return response.data;
});
  



export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const response = await axios.post(`${API_URL}/auth/social-login`, {
    email: result.user.email,
    username: result.user.displayName,
    provider: 'google',
    image: result.user.photoURL
  });
  return response.data;
});




export const loginWithFacebook = createAsyncThunk('auth/loginWithFacebook', async () => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const response = await axios.post(`${API_URL}/auth/social-login`, {
    email: result.user.email,
    username: result.user.displayName,
    provider: 'facebook',
    image: result.user.photoURL
  });
  return response.data;
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
   
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload; // Assuming the response includes a user object
        state.token = action.payload.token; // Save the token from the response
        localStorage.setItem('token', action.payload.token); // Store token in localStorage
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.user = action.payload; // Assuming the response includes a user object
        state.token = action.payload.token; // Save the token from the response
        localStorage.setItem('token', action.payload.token); // Store token in localStorage
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.error = action.error.message; // Set error on Google login failure
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.error = action.error.message; // Set error on Facebook login failure
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

