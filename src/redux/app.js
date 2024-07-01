import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./event";

export const store = configureStore({
  reducer: {
    eventSlice,
  },
});
