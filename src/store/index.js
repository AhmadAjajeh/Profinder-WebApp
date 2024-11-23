import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import errorHandlingSlice from "./errorHandlingSlice";
import alertSlice from "./alertSlice";
import activationCodeSlice from "./activationCodeSlice";
import eventSlice from "./dataSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    error: errorHandlingSlice.reducer,
    alert: alertSlice.reducer,
    activation: activationCodeSlice.reducer,
    event: eventSlice.reducer,
  },
});

export default store;
