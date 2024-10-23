import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getKeys, generateKey, deleteKey } from "../thunks/keys";
import { ApiKey } from "@/types/schema";

interface KeysState {
  currentkey: string;
  keys: ApiKey[];
  isLoading: boolean;
  generateLoad: boolean;
  deleteLoad: boolean;
  error: string | null;
}

const initialState: KeysState = {
  currentkey: '',
  keys: [],
  isLoading: false,
  generateLoad: false,
  deleteLoad: false,
  error: null,
};

const keysSlice = createSlice({
  name: "keys",
  initialState,
  reducers: {
    setKeys: (state, action: PayloadAction<ApiKey[]>) => {
      state.keys = action.payload;
    },
    clearKeys: (state) => {
      state.keys = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentkey: (state, action: PayloadAction<string>) => {
      state.currentkey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKeys.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getKeys.fulfilled, (state, action: PayloadAction<ApiKey[]>) => {
        state.keys = action.payload;
        state.isLoading = false;
      })
      .addCase(getKeys.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(generateKey.pending, (state) => {
        state.generateLoad = true;
        state.error = null;
      })
      .addCase(
        generateKey.fulfilled,
        (state, action: PayloadAction<ApiKey>) => {
          state.keys.push(action.payload);
          state.generateLoad = false;
        }
      )
      .addCase(generateKey.rejected, (state, action) => {
        state.generateLoad = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteKey.pending, (state) => {
        state.deleteLoad = true;
        state.error = null;
      })
      .addCase(deleteKey.fulfilled, (state, action: PayloadAction<string>) => {
        state.keys = state.keys.filter((key) => key.id !== action.payload);
        state.deleteLoad = false;
      })
      .addCase(deleteKey.rejected, (state, action) => {
        state.deleteLoad = false;
        state.error = action.payload as string;
      });
  },
});

export const { setKeys, clearKeys, setLoading,setCurrentkey } = keysSlice.actions;
export default keysSlice.reducer;
