import { createSlice } from "@reduxjs/toolkit";

export const rechargeSlice = createSlice({
  name: "recharge",
  initialState: {
    value: null,
  },
  reducers: {
    recharge: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { recharge } = rechargeSlice.actions;

export default rechargeSlice.reducer;
