import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// التحقق من حالة تسجيل الدخول
const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// إرسال التسجيل
export const submitRegistration = createAsyncThunk(
  'registration/submit',
  async (registrationData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue('يجب تسجيل الدخول أولاً');
      }

      const response = await fetch('http://localhost:5000/api/WhatWeOffer2/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// معالجة الدفع
export const processPayment = createAsyncThunk(
  'registration/payment',
  async (paymentData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await fetch('http://localhost:5000/api/WhatWeOffer2/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// جلب تسجيلات المستخدم
export const fetchUserRegistrations = createAsyncThunk(
  'registration/fetchUserRegistrations',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await fetch('http://localhost:5000/api/WhatWeOffer2/user-registrations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registrations: [],
    currentRegistration: null,
    loading: false,
    error: null,
    paymentStatus: null,
    userRegistrations: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetRegistration: (state) => {
      state.currentRegistration = null;
      state.error = null;
      state.paymentStatus = null;
    },
    updatePaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // التسجيل
      .addCase(submitRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations.push(action.payload);
        state.currentRegistration = action.payload;
        state.error = null;
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'فشل في التسجيل';
      })
      // الدفع
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = 'success';
        if (state.currentRegistration) {
          state.currentRegistration.paymentStatus = 'completed';
        }
        state.error = null;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'فشل في عملية الدفع';
        state.paymentStatus = 'failed';
      })
      // جلب تسجيلات المستخدم
      .addCase(fetchUserRegistrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.userRegistrations = action.payload;
        state.error = null;
      })
      .addCase(fetchUserRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'فشل في جلب التسجيلات';
      });
  },
});

export const { clearError, resetRegistration, updatePaymentStatus } = registrationSlice.actions;
export default registrationSlice.reducer;
