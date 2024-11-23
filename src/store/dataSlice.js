import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    data: null,
    type: "",
  },
  reducers: {
    set(state, action) {
      state.data = action.payload.data;
      state.type = action.payload.type;
    },
    clear(state) {
      state.data = null;
      state.type = "empty";
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice;
