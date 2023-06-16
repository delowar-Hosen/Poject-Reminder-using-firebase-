import { createSlice } from "@reduxjs/toolkit";

export const paidHistorySlice = createSlice({
  name: "paidHistory",
  initialState: {
    value: null,
  },
  reducers: {
    paidHistory: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {paidHistory} = paidHistorySlice.actions;

export default paidHistorySlice.reducer;
