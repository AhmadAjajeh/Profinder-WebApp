import { createSlice } from "@reduxjs/toolkit";

const activationCodeSlice = createSlice({
  name: "activation",
  initialState: {
    targetEmail: "",
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    clearEmail(state) {
      state.email = "";
    },
  },
});

export const activationActions = activationCodeSlice.actions;

export default activationCodeSlice;
