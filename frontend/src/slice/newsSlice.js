import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to fetch programs from the backend
export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => {
  const response = await fetch('http://localhost:5000/api/news');
  const data = await response.json();
  return data;
});

const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    programs: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.programs = action.payload; // Storing fetched data in state
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default programsSlice.reducer;
