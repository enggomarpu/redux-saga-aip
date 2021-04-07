import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {}
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    user: (state, action) => {
      state.userInfo = action.payload
    }
  },
});
export const { user } = appSlice.actions;
export default appSlice.reducer;