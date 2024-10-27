import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getApiUsage, getLogs } from "../thunks/usage";
import { Logs, UsageRecord } from "@/types";

interface INIT {
  isLoading: boolean;
  usage: UsageRecord;
  logs: Logs[];
}

const initialState: INIT = {
  isLoading: false,
  usage: {
    cacheCount: 0,
    uncacheCount: 0,
    usageRecord: [],
  },
  logs: [],
};

const usageSlice = createSlice({
  name: "usage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApiUsage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApiUsage.fulfilled, (state, action: PayloadAction<UsageRecord>) => {
        state.isLoading = false;
        state.usage = action.payload;
      })
      .addCase(getApiUsage.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error);
      })
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogs.fulfilled, (state, action: PayloadAction<Logs[]>) => {
        state.isLoading = false;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error);
      });
  },
});

export default usageSlice.reducer;
