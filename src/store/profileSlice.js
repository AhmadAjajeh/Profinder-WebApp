import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {
    set(state, action) {
      state.profile = action.payload.profile;
    },
    clear(state) {
      state.profile = null;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
