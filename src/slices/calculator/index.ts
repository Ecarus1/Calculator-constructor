import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICalculator {
  checkMode: boolean;
}

const initialState: ICalculator = {
  checkMode: true
}

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    // incriment(state, action: PayloadAction<number>) {
    //   state.num += 1;
    // }
    changeCheckMode(state) {
      state.checkMode = !state.checkMode;
    }
  }
});

export const {changeCheckMode} = calculatorSlice.actions;
export default calculatorSlice.reducer;