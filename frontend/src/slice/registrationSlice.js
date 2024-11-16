// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const submitRegistration = createAsyncThunk('registration/submit', async (registrationData) => {
//   const response = await fetch('http://localhost:5000/api/registrations', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(registrationData),
//   });
//   return response.json();
// });

// const registrationSlice = createSlice({
//   name: 'registration',
//   initialState: {
//     registration: [], // Initialize as an array
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitRegistration.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(submitRegistration.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.registration.push(action.payload); // Save the registration info
//       })
//       .addCase(submitRegistration.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default registrationSlice.reducer;
// src/slice/registrationSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { useAuth } from '../context/AuthContext'; // Import the context

// export const submitRegistration = createAsyncThunk(
//   'registration/submit',
//   async (registrationData, { rejectWithValue }) => {
//     const { token } = useAuth(); // Get the token from context

//     try {
//       const response = await fetch('http://localhost:5000/api/registrations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`, // Include the token
//         },
//         body: JSON.stringify(registrationData),
//       });

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         return rejectWithValue(errorResponse.msg || 'Failed to submit registration');
//       }

//       const data = await response.json();
//       return data; // Return the data you want to store in Redux
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const registrationSlice = createSlice({
//   name: 'registration',
//   initialState: {
//     registration: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // Your other reducers can go here if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(submitRegistration.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(submitRegistration.fulfilled, (state, action) => {
//         state.loading = false;
//         state.registration.push(action.payload); // Add the new registration to the list
//       })
//       .addCase(submitRegistration.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; // Set the error message
//       });
//   },
// });

// export default registrationSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk for submitting registration
export const submitRegistration = createAsyncThunk(
  'registration/submit',
  async (registrationData, { rejectWithValue }) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token found, please log in again');
      }

      const response = await axios.post(
        `http://localhost:5000/api/registrations`,
        registrationData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, // Add token to headers
          },
          withCredentials: true, // Include credentials if required
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Server error');
    }
  }
);


// Create a slice for registration
const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registration: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Your other reducers can go here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registration.push(action.payload); // Add the new registration to the list
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export default registrationSlice.reducer;
