import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  user: {
    id: '',
    username: '',
    approved: new Date(),
    profileId: '',
    companies: [],
    managerAt: [],
    background_image: '',
    profile_image: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
