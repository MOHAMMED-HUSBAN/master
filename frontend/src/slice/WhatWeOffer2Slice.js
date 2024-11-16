// src/slice/WhatWeOffer2Slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// جلب جميع البرامج
export const fetchPrograms = createAsyncThunk(
  'offer/fetchPrograms',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/WhatWeOffer2', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'x-auth-token': token || ''
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// جلب برنامج محدد
export const fetchProgramById = createAsyncThunk(
  'offer/fetchProgramById',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching program with ID:', id);
      
      const response = await fetch(`http://localhost:5000/api/WhatWeOffer2/${id}`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'x-auth-token': token || ''
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Program not found');
      }
      
      const data = await response.json();
      console.log('Received program data:', data);
      return data;
    } catch (error) {
      console.error('Error in fetchProgramById:', error);
      return rejectWithValue(error.message);
    }
  }
);

// إضافة thunk للاشتراك
export const subscribeToProgramThunk = createAsyncThunk(
  'offer/subscribeToProgram',
  async ({ programId, userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/subscriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ programId, userId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const WhatWeOffer2Slice = createSlice({
  name: 'offer',
  initialState: {
    programs: [],
    currentProgram: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // جلب جميع البرامج
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // جلب برنامج محدد
      .addCase(fetchProgramById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgramById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProgram = action.payload;
      })
      .addCase(fetchProgramById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = WhatWeOffer2Slice.actions;
export default WhatWeOffer2Slice.reducer;
