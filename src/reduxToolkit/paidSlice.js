import { createSlice } from "@reduxjs/toolkit";

export const paidSlice = createSlice({
  name: "paid",
  initialState: {
    value: null,
  },
  reducers: {
    paid: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { paid } = paidSlice.actions;

export default paidSlice.reducer;
