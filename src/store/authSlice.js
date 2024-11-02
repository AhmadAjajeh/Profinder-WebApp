import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {
    id: "",
    username: "",
    approved: new Date(),
    profileId: "",
    companies: [],
    managerAt: [],
    backgroundImage: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
