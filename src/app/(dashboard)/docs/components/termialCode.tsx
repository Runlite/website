import React, { useState, useEffect } from "react";
import { Check, Copy, TerminalSquare } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type SupportedLanguage =
  | "python"
  | "javascript"
  | "typescript"
  | "java"
  | "csharp"
  | "php"
  | "rust"
  | "go"
  | "ruby";

const languageColors: Record<SupportedLanguage, string> = {
  python: "#3572A5",
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  java: "#B07219",
  csharp: "#178600",
  php: "#4F5D95",
  rust: "#DEA584",
  go: "#00ADD8",
  ruby: "#CC342D",
};

interface TerminalCodeProps {
  code: string;
  language: string;
}

export const TerminalCode: React.FC<TerminalCodeProps> = ({
  code,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExpanded(false);
    }, 30000);

    return () => clearTimeout(timeout);
  }, [expanded]);

  const languageColor =
    languageColors[language as SupportedLanguage] || "#CCCCCC";

  return (
    <div className="relative border border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex items-center">
          <TerminalSquare size={18} className="text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-200">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: languageColor }}
            title={`${language} color`}
          ></div>
          <button
            onClick={handleCopy}
            className="p-1 rounded-md hover:bg-gray-700 transition-colors"
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <Copy size={16} className="text-gray-400" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`relative ${expanded ? "h-auto" : "h-64"} overflow-hidden`}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            height: "100%",
          }}
        >
          {code}
        </SyntaxHighlighter>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
        )}
      </div>
      <button
        onClick={toggleExpand}
        className="w-full text-center py-2 bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors text-sm"
      >
        {expanded ? "Collapse" : "Expand"}
      </button>
    </div>
  );
};
