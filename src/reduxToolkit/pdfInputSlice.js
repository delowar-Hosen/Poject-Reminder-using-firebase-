import { createSlice } from "@reduxjs/toolkit";

export const pdfInputSlice = createSlice({
  name: "pdfInput",
  initialState: {
    value: null,
  },
  reducers: {
    pdf: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pdf } = pdfInputSlice.actions;

export default pdfInputSlice.reducer;
