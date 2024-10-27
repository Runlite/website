"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getKeys, deleteKey, generateKey } from "@/store/thunks/keys";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

import { ApiKeyTable } from "./components/ApiKeyTable";
import { CreateApiKeyDialog } from "./components/createApiDialog";
import { NewApiKeyDialog } from "./components/apikeyDialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus, RefreshCcw } from "lucide-react";
import { Version } from "@/types/schema";
const APIManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { keys, isLoading, error, generateLoad } = useSelector(
    (state: RootState) => state.keys
  );
  const { toast } = useToast();
  const { AuthLoad, user } = useAuth();
  const [newApiKey, setNewApiKey] = useState("");
  const [deletingKeys, setDeletingKeys] = useState<Record<string, boolean>>({});
  const [newKeyDialogOpen, setNewKeyDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (user && !AuthLoad) {
      dispatch(getKeys());
    }
  }, [dispatch, AuthLoad, user]);

  const handleDeleteKey = useCallback(
    async (keyId: string) => {
      setDeletingKeys((prev) => ({ ...prev, [keyId]: true }));
      try {
        await dispatch(deleteKey(keyId));
        toast({
          title: "API Key Deleted",
          description: "The API key has been successfully deleted.",
        });
      } catch (error) {
        toast({
          title: `${(error as Error).message}`,
          description: "Failed to delete the API key. Please try again.",
          variant: "destructive",
        });
      } finally {
        setDeletingKeys((prev) => ({ ...prev, [keyId]: false }));
      }
    },
    [dispatch, toast]
  );

  const handleGenerateKey = useCallback(
    async (apiForm: { name: string; desc: string; version: Version }) => {
      try {
        const result = await dispatch(generateKey(apiForm));
        if (generateKey.fulfilled.match(result)) {
          setCreateDialogOpen(false);
          setNewApiKey(result.payload.key);
          setNewKeyDialogOpen(true);
        }
      } catch (error) {
        toast({
          title: `${(error as Error).message}`,
          description: "Failed to create a new API key. Please try again.",
          variant: "destructive",
        });
      }
    },
    [dispatch, toast]
  );

  return (
    <Card className="mx-auto max-w-7xl border-none shadow-none">
      <CardHeader>
        <AlertSection />
        <div className="flex justify-between items-center gap-2 ml-auto">
          <CreateApiButton
            onClick={() => setCreateDialogOpen(true)}
            isLoading={generateLoad}
          />
          <RefreshButton
            onClick={() => dispatch(getKeys())}
            isLoading={isLoading}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ApiKeyTable
          keys={keys}
          isLoading={isLoading}
          error={error}
          deletingKeys={deletingKeys}
          onDeleteKey={handleDeleteKey}
        />
      </CardContent>
      <CreateApiKeyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleGenerateKey}
        isLoading={generateLoad}
      />
      <NewApiKeyDialog
        open={newKeyDialogOpen}
        setOpen={setNewKeyDialogOpen}
        apiKey={newApiKey}
      />
    </Card>
  );
};

const AlertSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Alert variant="default" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        As an owner of this project, you can view and manage all API keys in
        this project.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Do not share your API key with others, or expose it in the browser or
        other client-side code. In order to protect the security of your
        account, Runlite may also automatically disable any API key that has
        leaked publicly.
      </AlertDescription>
    </Alert>
    <p className="mt-4 text-sm text-gray-600">
      View usage per API key on the{" "}
      <a href="/usage" className="text-blue-600 hover:underline">
        Usage page
      </a>
      .
    </p>
  </motion.div>
);

const CreateApiButton: React.FC<{
  onClick: () => void;
  isLoading: boolean;
}> = ({ onClick, isLoading }) => (
  <motion.div
    className="ml-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <Button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white"
      disabled={isLoading}
    >
      <Plus className="mr-2 h-4 w-4" /> Create New API
    </Button>
  </motion.div>
);
const RefreshButton = ({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={isLoading}
      className={`
        flex 
        items-center 
        gap-2 
        transition-all 
        duration-200
        hover:shadow-md
        ${isLoading ? "opacity-70" : "opacity-100"}
      `}
    >
      <RefreshCcw
        size={16}
        className={`
          ${isLoading ? "animate-spin" : "animate-none"}
          transition-transform
          duration-300
          group-hover:rotate-180
        `}
      />
      <span className="hidden sm:inline">Refresh Keys</span>
    </Button>
  );
};

export default APIManagement;
