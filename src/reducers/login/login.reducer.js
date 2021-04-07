import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  loading: false,
  error: false,
  type: '',
  isAuthenticated: false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      console.log('login reducer called')
      state.user = { ...state.user, ...action.payload.data };
      state.loading = false;
      state.error = false;
      state.isAuthenticated = true
      state.type = action.type;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = true;
    }
  },
});
export const {
  login,
  loginSuccess,
  error
} = loginSlice.actions;
export default loginSlice.reducer;