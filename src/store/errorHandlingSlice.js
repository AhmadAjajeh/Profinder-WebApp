import { createSlice } from "@reduxjs/toolkit";

const errorHandlingSlice = createSlice({
  name: "error",
  initialState: {
    code: 0,
    messages: [],
  },
  reducers: {
    throwError(state, action) {
      state.code = action.payload.code;
      state.messages = action.payload.messages;
    },
    clearError(state) {
      state.code = 0;
      state.messages = [];
    },
  },
});

export const errorHandlingActions = errorHandlingSlice.actions;

export default errorHandlingSlice;
