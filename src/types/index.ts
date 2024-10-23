import { DEFAULT_LANGUAGE, DEFAULT_THEME } from "@/constants";

export type Theme = (typeof DEFAULT_THEME)[number];
export type Language = (typeof DEFAULT_LANGUAGE)[number];

export interface Result {
  status: Status;
  stdout?: string;
  stderr?: string;
  error?: string;
  executionTime?: number;
  resourceUsage?: ResourceUsage;
  exitCode?: number | null;
  signal?: NodeJS.Signals | null;
  killedBySystem?: boolean;
  metrics?: {
    compilationTime: number;
    totalTime: number;
  };
  stats?: unknown;
}

export interface ResourceUsage {
  memory: { peak: number; average: number };
  cpu: { peak: number; average: number };
}

export interface Payload {
  syntax: string;
  lang: Language;
}

export enum Status {
  Accepted = "Accepted",
  TimeLimitExceeded = "Time Limit Exceeded",
  MemoryLimitExceeded = "Memory Limit Exceeded",
  RuntimeError = "Runtime Error",
  InternalError = "Internal Error",
  Failed="Failed",
  Idle = "Idle",
}


