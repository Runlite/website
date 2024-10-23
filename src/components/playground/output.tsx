import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Braces, Copy, Check, Loader2 } from "lucide-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEditor } from "@/hooks/useEditor";
import { Status } from "@/types";
import { STATUS_CONFIG, COPY_TIMEOUT, INITIAL_LOAD_DELAY } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
SyntaxHighlighter.registerLanguage("json", json);

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const { color, tooltip } = STATUS_CONFIG[status] || {
    color: "bg-gray-200",
    tooltip: "Unknown status",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge
              className={`capitalize ${color} transition-all duration-300 hover:opacity-80 text-xs px-2 py-1`}
            >
              {status}
            </Badge>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-white text-gray-800 px-3 py-1 shadow-lg"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const CopyButton: React.FC<{ content: string }> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_TIMEOUT);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="absolute top-2 right-2"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-200"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </motion.div>
  );
};

const OutputContent: React.FC<{ content: string; language: string }> = ({
  content,
  language,
}) => (
  <div className="relative">
    <ScrollArea className="h-[85vh] w-full bg-white">
      <SyntaxHighlighter
        language={language}
        style={docco}
        customStyle={{
          backgroundColor: "transparent",
          fontSize: "0.875rem",
          padding: "1rem",
        }}
        wrapLines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
      >
        {content}
      </SyntaxHighlighter>
    </ScrollArea>
    <CopyButton content={content} />
  </div>
);

const LoadingAnimation: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
    <span className="text-sm text-gray-600">Processing...</span>
  </div>
);

export const OutputBox: React.FC = () => {
  const { response, isLoading } = useEditor();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), INITIAL_LOAD_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const tabContent = useMemo(
    () => ({
      output: response?.stdout || response?.stderr || response?.error || "No output available",
      details: JSON.stringify(response, null, 2),
    }),
    [response]
  );

  const OutputSkeleton: React.FC = () => (
    <div className="space-y-2 p-4">
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 w-${
            ["full", "3/4", "5/6", "2/3", "4/5"][index]
          } bg-gray-300`}
        />
      ))}
    </div>
  );
  const renderContent = (content: string, language: string) => (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full"
        >
          <OutputSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <OutputContent content={content} language={language} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.div
      className="bg-white border border-gray-300 shadow-md overflow-hidden h-[92vh]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue="output" className="w-full flex flex-col">
        <div className="flex justify-between items-center bg-gray-100 p-1 h-[7vh] border-b border-gray-300">
          <TabsList className="bg-white border border-gray-300 ">
            <TabsTrigger
              value="output"
              className="flex items-center data-[state=active]:bg-gray-100 data-[state=active]:text-gray-800 py-2 transition-colors duration-200"
            >
              <Code className="w-4 h-4 mr-2" />
              Output
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="flex items-center data-[state=active]:bg-gray-100 data-[state=active]:text-gray-800 py-2 transition-colors duration-200"
            >
              <Braces className="w-4 h-4 mr-2" />
              JSON
            </TabsTrigger>
          </TabsList>

          <AnimatePresence>
            {!initialLoad && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? (
                  <LoadingAnimation />
                ) : (
                  <StatusBadge status={response?.status as Status} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-white p-2 flex-grow overflow-hidden h-[85vh]">
          <>
              <TabsContent value="output" className="h-full">
                {renderContent(tabContent.output, "plaintext")}
              </TabsContent>
              <TabsContent value="details" className="h-full">
                {renderContent(tabContent.details, "json")}
              </TabsContent>
            </>
        </div>
      </Tabs>
    </motion.div>
  );
};
