import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    messages: [],
  },
  reducers: {
    alert(state, action) {
      state.messages = action.payload.messages;
    },
    clear(state) {
      state.messages = [];
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice;
