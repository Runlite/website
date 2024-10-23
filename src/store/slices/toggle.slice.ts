import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  openOutput: boolean;
}

const initialState: ToggleState = {
  openOutput: true,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggle(
      state,
      action: PayloadAction<{ key: keyof ToggleState; value: boolean }>
    ) {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setToggle } = toggleSlice.actions;
export default toggleSlice.reducer;
