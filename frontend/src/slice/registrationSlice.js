import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitRegistration = createAsyncThunk('registration/submit', async (registrationData) => {
  const response = await fetch('http://localhost:5000/api/registrations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  });
  return response.json();
});

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registration: [], // Initialize as an array
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.registration.push(action.payload); // Save the registration info
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default registrationSlice.reducer;
