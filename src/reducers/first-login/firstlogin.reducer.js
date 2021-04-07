import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: {},
  loading: false,
  error: false,
  type: '', 
  isVerified: false
};

const firstLoginSlice = createSlice({
  name: 'firstLogin',
  initialState,
  reducers: {
    firstLogin: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    firstLoginSuccess: (state, action) => {
      console.log('login reducer called');
      //state.user = { ...state.user, ...action.payload.data };
      state.loading = false;
      //state.errorM = true;
      state.isVerified = true;
      state.error = false
      //state.type = action.type;
    },
    firstLoginFail: (state, action) => {
      //state.user = { ...state.user, ...action.payload.data };
      state.loading = false;
      state.error = true;
      state.type = action.type;
    },
  },
});

export const {
  firstLogin,
  firstLoginSuccess,
  firstLoginFail
} = firstLoginSlice.actions;

export default firstLoginSlice.reducer;