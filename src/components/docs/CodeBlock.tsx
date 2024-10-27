import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-4 mb-6 group">
      {/* Mac terminal-style header */}
      <div className="flex items-center space-x-2 bg-gray-800 rounded-t-md p-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {/* Code block */}
      <pre className="bg-gray-900 text-gray-100 rounded-b-lg p-4 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>

      {/* Copy button */}
      <button 
        className="absolute top-3 right-3 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md px-2 py-1 text-xs transition-opacity duration-200 opacity-0 group-hover:opacity-100 flex items-center"
        onClick={copyCode}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 mr-1" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </>
        )}
      </button>
    </div>
  );
};
