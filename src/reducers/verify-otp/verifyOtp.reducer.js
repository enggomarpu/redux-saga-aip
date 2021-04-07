import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  loading: false,
  error: false,
  type: ''
};

const verifyOtpSlice = createSlice({
  name: 'verifyOtp',
  initialState,
  reducers: {
    verifyOTP: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    verifyOTPSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload.data };
      state.loading = false;
      state.error = false;
      state.type = action.type;
    },
    resendOTP: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    resendOTPSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload.data };
      state.loading = false;
      state.error = false;
      state.type = action.type;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = true;
    }
  },
});

export const {
  verifyOTP,
  verifyOTPSuccess,
  resendOTP,
  resendOTPSuccess,
  error
} = verifyOtpSlice.actions;

export default verifyOtpSlice.reducer;