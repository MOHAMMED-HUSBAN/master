// src/slice/WhatWeOffer2Slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWhatWeOffer2 = createAsyncThunk('WhatWeOffer2/fetchWhatWeOffer2', async () => {
  const response = await fetch('http://localhost:5000/api/WhatWeOffer2');
  return response.json();
});

const WhatWeOffer2Slice = createSlice({
  name: 'WhatWeOffer2',
  initialState: {
    WhatWeOffer2: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWhatWeOffer2.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWhatWeOffer2.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched WhatWeOffer2 to the array
        state.WhatWeOffer2 = action.payload;
      })
      .addCase(fetchWhatWeOffer2.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default WhatWeOffer2Slice.reducer;
