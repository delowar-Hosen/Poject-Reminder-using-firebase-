import { configureStore } from "@reduxjs/toolkit";
import paidSlice from "./reduxToolkit/paidSlice";

export const store = configureStore({
  reducer: {
    paid: paidSlice,
  },
});
