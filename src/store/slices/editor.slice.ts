import { Language, Result, Theme, Status } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface InitEditorState {
  theme: Theme;
  language: Language;
  code: string;
  response: Result | null;
  isLoading: boolean;
}
const initialState: InitEditorState = {
  theme: "light",
  language: "javascript",
  code: "",
  response: { status: Status.Idle },
  isLoading: false,
};

const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    setResponse(state, action: PayloadAction<Result | null>) {
      state.response = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});
export const { setTheme, setLanguage, setCode, setResponse, setLoading } =
  editor.actions;

export default editor.reducer;
