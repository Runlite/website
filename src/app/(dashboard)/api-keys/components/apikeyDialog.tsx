// NewApiKeyDialog.tsx
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Copy } from "lucide-react";

interface NewApiKeyDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  apiKey: string;
}

export const NewApiKeyDialog: React.FC<NewApiKeyDialogProps> = ({
  open,
  setOpen,
  apiKey,
}) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const { toast } = useToast();

  const handleCopyKey = useCallback(() => {
    navigator.clipboard
      .writeText(apiKey)
      .then(() => {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
        toast({
          title: "API Key Copied",
          description: "The API key has been copied to your clipboard.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy API key:", err);
        toast({
          title: "Copy Failed",
          description: "Failed to copy the API key. Please try again.",
          variant: "destructive",
        });
      });
  }, [apiKey, toast]);

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                New API Key Created
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Please copy your new API key. It will only be shown once.
              </DialogDescription>
            </DialogHeader>
            <motion.div
              className="py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <code className="bg-gray-100 p-4 rounded-lg block mb-4 text-sm font-mono break-all">
                  {apiKey}
                </code>
                <motion.div
                  className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: copiedKey ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle className="text-green-500 h-8 w-8" />
                </motion.div>
              </div>
              <Button
                onClick={handleCopyKey}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              >
                <Copy className="mr-2 h-4 w-4" />
                {copiedKey ? "Copied!" : "Copy API Key"}
              </Button>
            </motion.div>
            <DialogFooter>
              <Button
                onClick={() => setOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-300"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
