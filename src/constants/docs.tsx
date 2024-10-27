import Authentication from "@/components/docs/Authentication";
import QuickStart from "@/components/docs/QuickStart";
import SupportedLanguages from "@/components/docs/SupportedLanguages";
import Usage from "@/components/docs/Usage";
import Limits from "@/components/docs/Limits";
import ErrorHandling from "@/components/docs/ErrorHandling";
import Webhooks from "@/components/docs/Webhooks";
import Introduction from "@/components/docs/introduction";

import {
  Book,
  Key,
  Send,
  Settings,
  Clock,
  Code,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export interface Subheading {
  id: string;
  title: string;
}

export interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
  subheadings: Subheading[];
}

export const sections: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: Book,
    content: <Introduction />,
    subheadings: [
      { id: "what-is-runlite", title: "What is Runlite?" },
      { id: "key-features", title: "Key Features" },
      { id: "getting-started", title: "Getting Started" },
    ],
  },
  {
    id: "authentication",
    title: "Authentication",
    icon: Key,
    content: <Authentication />,
    subheadings: [
      { id: "api-keys", title: "API Keys" },
      { id: "authentication-process", title: "Authentication Process" },
      { id: "security-best-practices", title: "Security Best Practices" },
    ],
  },
  {
    id: "quickstart",
    title: "Quick Start",
    icon: Send,
    content: <QuickStart />,
    subheadings: [
      { id: "installation", title: "Installation" },
      { id: "first-request", title: "Your First Request" },
      { id: "example-usage", title: "Example Usage" },
    ],
  },
  {
    id: "languages",
    title: "Supported Languages",
    icon: Code,
    content: <SupportedLanguages />,
    subheadings: [
      { id: "language-list", title: "List of Supported Languages" },
      { id: "language-specific-features", title: "Language-Specific Features" },
      { id: "adding-new-languages", title: "Adding New Languages" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Usage",
    icon: Settings,
    content: <Usage />,
    subheadings: [
      { id: "advanced-configuration", title: "Advanced Configuration" },
      { id: "custom-runners", title: "Custom Runners" },
      { id: "integrations", title: "Integrations" },
    ],
  },
  {
    id: "ratelimits",
    title: "Rate Limits",
    icon: Clock,
    content: <Limits />,
    subheadings: [
      { id: "rate-limit-overview", title: "Rate Limit Overview" },
      { id: "handling-rate-limits", title: "Handling Rate Limits" },
      { id: "increasing-limits", title: "Increasing Your Limits" },
    ],
  },
  {
    id: "errors",
    title: "Error Handling",
    icon: AlertCircle,
    content: <ErrorHandling />,
    subheadings: [
      { id: "common-errors", title: "Common Errors" },
      { id: "error-codes", title: "Error Codes" },
      { id: "debugging-tips", title: "Debugging Tips" },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    icon: RefreshCw,
    content: <Webhooks />,
    subheadings: [
      { id: "webhook-setup", title: "Setting Up Webhooks" },
      { id: "webhook-events", title: "Webhook Events" },
      { id: "webhook-security", title: "Webhook Security" },
    ],
  },
];
