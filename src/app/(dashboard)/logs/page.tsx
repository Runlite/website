"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Search } from "lucide-react";
import { Logs } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getLogs } from "@/store/thunks/usage";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SortConfig {
  key: keyof Logs;
  direction: "asc" | "desc";
}

interface Column {
  key: keyof Logs;
  label: string;
  sortable?: boolean;
  width?: string;
}

const ITEMS_PER_PAGE = 10;
const SKELETON_ROWS = 5;

const COLUMNS: Column[] = [
  { key: "id", label: "ID", sortable: true, width: "w-[100px]" },
  { key: "action", label: "Action", sortable: true, width: "w-[150px]" },
  { key: "details", label: "Details", width: "w-[400px]" },
  { key: "createdAt", label: "Created At", sortable: true, width: "w-[200px]" },
];

const EventLogsTable: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { logs, isLoading } = useSelector((state: RootState) => state.usage);
  const { user } = useAuth();
  const TableSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: SKELETON_ROWS }).map((_, idx) => (
        <div key={idx} className="flex space-x-4">
          <Skeleton className="h-12 w-[100px]" />
          <Skeleton className="h-12 w-[150px]" />
          <Skeleton className="h-12 w-[400px]" />
          <Skeleton className="h-12 w-[200px]" />
        </div>
      ))}
    </div>
  );
  useEffect(() => {
    if (user) {
      dispatch(getLogs());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  const handleSort = (key: keyof Logs) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: "asc" };
      }
      if (current.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };
  const sortedLogs = useMemo(() => {
    if (!logs?.length) return [];

    const sortableLogs = [...logs];
    if (sortConfig) {
      sortableLogs.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }
    return sortableLogs;
  }, [logs, sortConfig]);

  const filteredLogs = useMemo(() => {
    if (!search.trim()) return sortedLogs;

    return sortedLogs.filter((log) =>
      Object.values(log).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [sortedLogs, search]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredLogs, currentPage]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.log(error);
      return dateString;
    }
  };

  const formatDetails = (details: JSON) => {
    try {
      return JSON.stringify(details, null, 2);
    } catch (error) {
      console.log(error);
      return String(details);
    }
  };

  const renderPaginationLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }
    return pages;
  };

  return (
    <Card className="max-w-7xl border-none shadow-none">
      <CardHeader>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search in logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 max-w-sm bg-background"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {COLUMNS.map((column) => (
                  <TableHead key={column.key} className={column.width}>
                    <div className="flex items-center space-x-2">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort(column.key)}
                          className="ml-2 h-8 w-8 p-0 hover:bg-muted"
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={COLUMNS.length} className="p-4">
                    <TableSkeleton />
                  </TableCell>
                </TableRow>
              ) : paginatedLogs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={COLUMNS.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No logs found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">{log.id}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary">
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell>
                      <pre className="text-sm whitespace-pre-wrap bg-muted p-2 rounded-md">
                        {formatDetails(log.details)}
                      </pre>
                    </TableCell>
                    <TableCell>{formatDate(log.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {paginatedLogs.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={`${
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    } hover:bg-muted`}
                  />
                </PaginationItem>
                {renderPaginationLinks()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={`${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    } hover:bg-muted`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventLogsTable;
