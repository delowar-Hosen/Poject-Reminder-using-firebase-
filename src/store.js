import { combineReducers, configureStore } from "@reduxjs/toolkit";
import paidSlice from "./reduxToolkit/paidSlice";
import userSlice from "./reduxToolkit/userlistSlice";
import pdfInputSlice from "./reduxToolkit/pdfInputSlice";
import rechargeSlice from "./reduxToolkit/rechargeSlice";
import paidHistorySlice from "./reduxToolkit/paidHistorySlice";
import rechargeAlertSlice from "./reduxToolkit/rechargeAlertSlice";

const reducers = combineReducers({
  paid: paidSlice,
  user: userSlice,
  pdf: pdfInputSlice,
  recharge: rechargeSlice,
  paidHistory: paidHistorySlice,
  rechargeAlert: rechargeAlertSlice,
});

export const store = configureStore({
  reducer: reducers,
});
