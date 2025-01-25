import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      console.log("payload is", action.payload);

      return action.payload;
    },
    removeRequest: (state, action) => null,
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
