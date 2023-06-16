import { createSlice } from "@reduxjs/toolkit";

export const reminderSlice = createSlice({
  name: "reminder",
  initialState: {
    value: null,
  },
  reducers: {
    reminder: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reminder } = reminderSlice.actions;

export default reminderSlice.reducer;
