import { Status } from "@/types";
import { Version } from "@/types/schema";
export const DEFAULT_THEME = ["vs-dark", "light"] as const;
export const DEFAULT_LANGUAGE = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "php",
  "rust",
  "go",
  "ruby",
] as const;
export const LanguageToCode: { [key: string]: number } = {
  javascript: 1078,
  java: 1058,
  cpp: 1090,
  python: 1080,
  go: 1088,
  typescript: 1070,
  ruby: 1083,
  php: 1030,
  rust: 1020,
} as const;
export const API_VERSIONS = ["v1", "v2"] as const;

export const STATUS_CONFIG: Record<Status, { color: string; tooltip: string }> =
  {
    [Status.Idle]: { color: "bg-gray-400", tooltip: "Waiting to execute" },
    [Status.Accepted]: {
      color: "bg-green-500",
      tooltip: "Code executed successfully",
    },
    [Status.TimeLimitExceeded]: {
      color: "bg-yellow-500",
      tooltip: "Execution time exceeded the limit",
    },
    [Status.MemoryLimitExceeded]: {
      color: "bg-yellow-500",
      tooltip: "Memory usage exceeded the limit",
    },
    [Status.RuntimeError]: {
      color: "bg-red-500",
      tooltip: "An error occurred during execution",
    },
    [Status.InternalError]: {
      color: "bg-red-500",
      tooltip: "An internal server error occurred",
    },
    [Status.Failed]: {
      color: "bg-red-500",
      tooltip: "Failed Exceution",
    },
  } as const;

export const INITIAL_LOAD_DELAY = 1000;
export const COPY_TIMEOUT = 2000;

export const apiVersions = [
  {
    value: Version.V1,
    label: "Version 1",
    description: "Stable release with basic features",
  },
  // {
  //   value: "v2",
  //   label: "Version 2",
  //   description: "Enhanced performance and additional endpoints",
  // },
  // {
  //   value: "v3",
  //   label: "Version 3 (Beta)",
  //   description: "Latest features, may have breaking changes",
  // },
] as const;
