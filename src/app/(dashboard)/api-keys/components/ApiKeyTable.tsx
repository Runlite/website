import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle, Trash2, Loader } from "lucide-react";
import { ApiKey, Status } from "@/types/schema";

interface ApiKeyTableProps {
  keys: ApiKey[];
  isLoading: boolean;
  error: string | null;
  deletingKeys: Record<string, boolean>;
  onDeleteKey: (keyId: string) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const ApiKeyTable: React.FC<ApiKeyTableProps> = ({
  keys,
  isLoading,
  error,
  deletingKeys,
  onDeleteKey,
}) => {
  const renderTableContent = () => {
    if (isLoading) {
      return Array(3)
        .fill(null)
        .map((_, index) => <SkeletonRow key={index} />);
    }
    const makeDateReadable = (timestamp: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return timestamp.toLocaleString("en-US", options);
    };
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-red-500">
            Error loading API keys. Please try again later.
          </TableCell>
        </TableRow>
      );
    }

    if (keys.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            No API keys found. Create one to get started.
          </TableCell>
        </TableRow>
      );
    }

    return keys.map((key: ApiKey) => (
      <motion.tr key={key.id} {...fadeInUp} transition={{ duration: 0.2 }}>
        <TableCell className="font-medium">{key.name}</TableCell>
        <TableCell>{key.description}</TableCell>
        <TableCell>{key.version}</TableCell>

        <TableCell className="flex gap-1 items-center">
          {key.status === Status.ACTIVE ? (
            <>
              Active
              <CheckCircle className="h-5 w-5 text-green-500" />
            </>
          ) : (
            <>
              Deactive <XCircle className="h-5 w-5 text-red-500" />
            </>
          )}
        </TableCell>
        <TableCell>{makeDateReadable(key.createdAt)}</TableCell>
        <TableCell>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDeleteKey(key.id)}
            className="bg-white text-red-500 hover:bg-white hover:border-red-400 border"
            disabled={deletingKeys[key.id]}
          >
            {deletingKeys[key.id] ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
      </motion.tr>
    ));
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
    >
      <ScrollArea className="h-[250px] rounded-md w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>{renderTableContent()}</AnimatePresence>
          </TableBody>
        </Table>
      </ScrollArea>
    </motion.div>
  );
};

const SkeletonRow: React.FC = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-[200px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[300px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[150px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[50px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-8 w-[100px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[50px]" />
    </TableCell>
  </TableRow>
);
