import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../UI/api/axios";

export const fetchEventData = createAsyncThunk("fetchCart", (token) => {
  return API.get("/event/getAll", {
    headers: {
      "x-token": token,
    },
  }).then((res) => {
    return res.data;
  });
});

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    error: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEventData.fulfilled, (state, { payload }) => {
        console.log("🚀 ~ builder.addCase ~ payload:", payload);
        state.events = payload.data;
      })
      .addCase(fetchEventData.rejected, (state, { error }) => {
        state.error = error.message;
      });
  },
});

export default eventSlice.reducer;
