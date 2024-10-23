import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "./slices/editor.slice";
import authReducer from "./slices/auth.slice";
import keyReducer from "./slices/keys.slice";
import toggleReducer from "./slices/toggle.slice";
export const store = configureStore({
  reducer: {
    editor: editorReducer,
    auth: authReducer,
    keys: keyReducer,
    toggle: toggleReducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: false,
    }),

  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
