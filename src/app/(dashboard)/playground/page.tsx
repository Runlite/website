"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editor, OutputBox, Header } from "@/components/playground";
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Dashboard: React.FC = () => {
  return (
    <div className="overflow-hidden bg-background h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={70}
          minSize={40}
          maxSize={70}
          className="flex flex-col relative"
        >
          <Header />

          <motion.div
            className="flex-grow overflow-auto h-[85vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Editor />
          </motion.div>
        </ResizablePanel>

        <AnimatePresence initial={false}>
          <>
            <ResizableHandle  />
            <ResizablePanel
              defaultSize={30}
              minSize={20}
              maxSize={60}
              className="relative"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <OutputBox />
              </motion.div>
            </ResizablePanel>
          </>
        </AnimatePresence>
      </ResizablePanelGroup>
    </div>
  );
};

export default Dashboard;
