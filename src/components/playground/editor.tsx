import dynamic from "next/dynamic";
import { useEditor } from "@/hooks/useEditor";
import { setCode } from "@/store/slices/editor.slice";
import { editor } from "monaco-editor";
import { Skeleton } from "@/components/ui/skeleton";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  { ssr: false }
);

export const Editor = () => {
  const { language, theme, code, dispatch, handleEditorDidMount } = useEditor();

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    glyphMargin: true,
    minimap: { enabled: false },
    hover: { enabled: true },
    scrollbar: { vertical: "hidden" as const },
    fontSize: 14,
    lineNumbers: "on",
    roundedSelection: false,
    selectOnLineNumbers: true,
    automaticLayout: true,
    smoothScrolling: true,
  };

  return (
    <>
      <MonacoEditor
        height="85vh"
        language={language}
        theme={theme}
        value={code}
        onChange={(value: string | undefined) =>
          dispatch(setCode(value as string))
        }
        onMount={handleEditorDidMount}
        options={editorOptions}
        loading={
          <Skeleton className="w-full h-full animate-pulse bg-gray-100 dark:bg-gray-800" />
        }
      />
    </>
  );
};
