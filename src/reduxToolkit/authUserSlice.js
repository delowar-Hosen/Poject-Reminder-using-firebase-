import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState: initialState,
  reducers: {
    authData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authData } = authUserSlice.actions;

export default authUserSlice.reducer;
