import { RootState } from "@/store";
import { useCallback, useRef } from "react";
import * as monaco from "monaco-editor";

import { useSelector, useDispatch } from "react-redux";
import { setUpMonaco } from "@/components/languages";
export const useEditor = () => {
  const dispatch = useDispatch();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { theme, language, code, response, isLoading } = useSelector(
    (state: RootState) => state.editor
  );
  const handleEditorDidMount = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor) => {
      editorRef.current = editor;
      setUpMonaco(language);
    },
    [language]
  );

  return {
    theme,
    language,
    dispatch,
    code,
    response,
    handleEditorDidMount,
    isLoading,
  };
};
