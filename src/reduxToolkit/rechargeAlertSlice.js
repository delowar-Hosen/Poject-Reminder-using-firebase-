import { createSlice } from "@reduxjs/toolkit";

export const rechargeAlertSlice = createSlice({
  name: "rechargeAlert",
  initialState: {
    value: null,
  },
  reducers: {
    rechargeAlert: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { rechargeAlert } = rechargeAlertSlice.actions;

export default rechargeAlertSlice.reducer;
