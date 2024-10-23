import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  AuthLoad: boolean;
  error: null | string;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  AuthLoad: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.AuthLoad = false;
      state.error = null;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.AuthLoad = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.AuthLoad = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.AuthLoad = false;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setLoading, setError, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
