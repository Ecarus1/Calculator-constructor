import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "../slices/calculator";

const store = configureStore({
  reducer: {
    calculator: calculatorReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;