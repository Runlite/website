// export Enums

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum Version {
  V1 = "V1",
  V2 = "V2",
}

export enum BillingInterval {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  PAST_DUE = "PAST_DUE",
  CANCELED = "CANCELED",
  UNPAID = "UNPAID",
}

export enum AuthProvider {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB",
}

// export Types

export type ApiKey = {
  id: string;
  name?: string | null;
  description?: string | null;
  key: string;
  userId: string;
  version: Version;
  status: Status;
  rateLimit: number;
  permissions?: unknown | null; // JSON export type
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  User: User;
  UsageRecord: UsageRecord[];
};

export type BillingInfo = {
  id: string;
  userId: string;
  name: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
};

export type Subscription = {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
  SubscriptionPlan: SubscriptionPlan;
  User: User;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  description?: string | null;
  price: number; // assuming `Decimal` in Prisma refers to a number in export TypeScript
  interval: BillingInterval;
  features: unknown; // JSON export type
  maxApiKeys: number;
  maxRequestsPerDay: number;
  createdAt: Date;
  updatedAt: Date;
  Subscription: Subscription[];
};

export type UsageRecord = {
  id: string;
  apiKeyId: string;
  endpoint: string;
  method: HttpMethod;
  statusCode: number;
  responseTime: number;
  timestamp: Date;
  ApiKey: ApiKey;
};

export type User = {
  id: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  provider: AuthProvider;
  createdAt: Date;
  updatedAt: Date;
  ApiKey: ApiKey[];
  AuditLog: AuditLog[];
  BillingInfo?: BillingInfo | null;
  Subscription: Subscription[];
};

export type AuditLog = {
  id: string;
  userId: string;
  action: string;
  details?: unknown | null; // JSON export type
  createdAt: Date;
  User: User;
};
