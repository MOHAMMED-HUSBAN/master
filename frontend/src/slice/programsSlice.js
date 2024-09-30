import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch programs from the backend
export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => {
  const response = await axios.get('http://localhost:5000/api/programs');
  return response.data;
});

// Async thunk to add a program
// export const addProgram = createAsyncThunk('programs/addProgram', async (newProgram) => {
//   const response = await axios.post('http://localhost:5000/api/programs', newProgram);
//   return response.data;
// });

// Async thunk to delete a program
// export const deleteProgram = createAsyncThunk('programs/deleteProgram', async (programId) => {
//   await axios.delete(`http://localhost:5000/api/programs/${programId}`);
//   return programId;
// });

const programSlice = createSlice({
  name: 'programs',
  initialState: {
    programs: [],
    status: 'idle',
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
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    
  },
});

export default programSlice.reducer;
