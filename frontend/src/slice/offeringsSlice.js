import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOfferings = createAsyncThunk('offerings/fetchOfferings', async () => {
  const response = await axios.get('http://localhost:5000/api/offerings');
  return response.data;
});

const offeringsSlice = createSlice({
  name: 'offerings',
  initialState: {
    offerings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOfferings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched offerings to the array
        state.offerings = action.payload;
      })
      .addCase(fetchOfferings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default offeringsSlice.reducer;
