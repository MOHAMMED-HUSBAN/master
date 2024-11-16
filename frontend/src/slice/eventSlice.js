// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
//   const response = await axios.get(`${API_URL}/events`);
//   return response.data;
// });

// export const joinEvent = createAsyncThunk('events/joinEvent', async (eventId, { getState }) => {
//   const { auth: { token } } = getState();
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-auth-token': token,
//     },
//   };
//   const response = await axios.post(`${API_URL}/events/${eventId}/join`, {}, config);
//   return response.data;
// });


// export const getUserEvents = createAsyncThunk('events/getUserEvents', async (_, { getState }) => {
//     const { auth: { token } } = getState();
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': token,
//       },
//     };
//     const response = await axios.get(`${API_URL}/events/user`, config);
//     return response.data;
//   });
//   const eventSlice = createSlice({
//     name: 'events',
//     initialState: {
//       events: [],
//       userEvents: [],
//       loading: false,
//       error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
 
//       .addCase(fetchEvents.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchEvents.fulfilled, (state, action) => {
//         state.loading = false;
//         state.events = action.payload;
//       })
//       .addCase(fetchEvents.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(joinEvent.fulfilled, (state, action) => {
//         const updatedEvent = action.payload;
//         const index = state.events.findIndex(event => event._id === updatedEvent._id);
//         if (index !== -1) {
//           state.events[index] = updatedEvent;
//         }
//         })
//         .addCase(getUserEvents.pending, (state) => {
//             state.loading = true;
//           })
//           .addCase(getUserEvents.fulfilled, (state, action) => {
//             state.loading = false;
//             state.userEvents = action.payload;
//           })
//           .addCase(getUserEvents.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//           });
//   },
// });

// export default eventSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
});

export const joinEvent = createAsyncThunk('events/joinEvent', async (eventId, { getState }) => {
  const { auth: { token } } = getState();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  const response = await axios.post(`${API_URL}/events/${eventId}/join`, {}, config);
  return response.data;
});

export const getUserEvents = createAsyncThunk('events/getUserEvents', async (_, { getState }) => {
  const { auth: { token } } = getState();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  const response = await axios.get(`${API_URL}/events/user`, config);
  return response.data;
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    userEvents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(joinEvent.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        const index = state.events.findIndex(event => event._id === updatedEvent._id);
        if (index !== -1) {
          state.events[index] = updatedEvent;
        }
      })
      .addCase(getUserEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.userEvents = action.payload;
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;