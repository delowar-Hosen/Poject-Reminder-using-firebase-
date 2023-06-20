import { createSlice } from "@reduxjs/toolkit";

export const authUserSlice = createSlice({
  name: "authUser",
  initialState: {
    value: null,
  },
  reducers: {
    authData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {authData} = authUserSlice.actions;

export default authUserSlice.reducer;
