"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getApiUsage } from "@/store/thunks/usage";
import { Record } from "@/types";
import { useAuth } from "@/hooks/useAuth";

interface HourlyData {
  hour: string;
  total: number;
  cached: number;
  uncached: number;
}

interface MonthlyData {
  month: string;
  total: number;
  cached: number;
  uncached: number;
}

type TimeRange = "1m" | "3m" | "6m" | "1y";
type ActiveTab = "cost" | "activity";

// Utility functions
const getHourlyData = (usageRecords: Record[]): HourlyData[] => {
  // Handle case when usageRecords is undefined or empty
  if (!usageRecords || usageRecords.length === 0) {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, "0")}:00`,
      total: 0,
      cached: 0,
      uncached: 0,
    }));
  }

  const hourlyMap = new Map<string, HourlyData>();

  // Initialize all hours
  for (let i = 0; i < 24; i++) {
    const hour = `${i.toString().padStart(2, "0")}:00`;
    hourlyMap.set(hour, {
      hour,
      total: 0,
      cached: 0,
      uncached: 0,
    });
  }

  usageRecords.forEach((record) => {
    if (!record.timestamp) return; // Skip invalid records

    const date = new Date(record.timestamp);
    const hour = date.getHours().toString().padStart(2, "0");
    const hourKey = `${hour}:00`;

    const hourData = hourlyMap.get(hourKey);
    console.log("hourData", hourData);
    if (hourData) {
      hourData.total += 1;
      if (record.isCached) {
        hourData.cached += 1;
      } else {
        hourData.uncached += 1;
      }
    }
  });

  return Array.from(hourlyMap.values()).sort(
    (a, b) => parseInt(a.hour) - parseInt(b.hour)
  );
};

const getMonthlyData = (usageRecords: Record[]): MonthlyData[] => {
  // Handle case when usageRecords is undefined or empty
  if (!usageRecords || usageRecords.length === 0) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      month,
      total: 0,
      cached: 0,
      uncached: 0,
    }));
  }

  const monthlyMap = new Map<string, MonthlyData>();

  // Initialize all months
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  months.forEach((month) => {
    monthlyMap.set(month, {
      month,
      total: 0,
      cached: 0,
      uncached: 0,
    });
  });

  usageRecords.forEach((record) => {
    if (!record.timestamp) return; // Skip invalid records

    const date = new Date(record.timestamp);
    const monthKey = date.toLocaleString("default", { month: "short" });

    const monthData = monthlyMap.get(monthKey);
    if (monthData) {
      monthData.total += 1;
      if (record.isCached) {
        monthData.cached += 1;
      } else {
        monthData.uncached += 1;
      }
    }
  });

  return Array.from(monthlyMap.values());
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name?: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <p className="font-medium text-gray-900">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} style={{ color: entry.color }} className="text-sm">
          {entry.name || entry.dataKey}: {entry.value}
        </p>
      ))}
    </div>
  );
};

interface HourlyChartProps {
  data: HourlyData[];
}

const HourlyChart: React.FC<HourlyChartProps> = ({ data }) => (
  <Card className="bg-white border border-gray-200 shadow-sm col-span-2">
    <CardHeader>
      <CardTitle>Hourly Usage Distribution</CardTitle>
      <CardDescription>
        Breakdown of cached vs uncached requests by hour
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="uncachedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="cachedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="uncached"
              name="Uncached Requests"
              stackId="1"
              stroke="#818cf8"
              fill="url(#uncachedGradient)"
            />
            <Area
              type="monotone"
              dataKey="cached"
              name="Cached Requests"
              stackId="1"
              stroke="#34d399"
              fill="url(#cachedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

interface MonthlyChartProps {
  data: MonthlyData[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => (
  <Card className="bg-white border border-gray-200 shadow-sm col-span-2">
    <CardHeader>
      <CardTitle>Monthly Usage Trend</CardTitle>
      <CardDescription>
        Total requests per month with cache breakdown
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="total"
              name="Total Requests"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="cached"
              name="Cached Requests"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ fill: "#34d399", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="uncached"
              name="Uncached Requests"
              stroke="#818cf8"
              strokeWidth={2}
              dot={{ fill: "#818cf8", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

interface CacheStatsCardProps {
  cacheCount: number;
  uncacheCount: number;
}

const CacheStatsCard: React.FC<CacheStatsCardProps> = ({
  cacheCount,
  uncacheCount,
}) => {
  const total = cacheCount + uncacheCount;
  const cacheRate = total > 0 ? ((cacheCount / total) * 100).toFixed(1) : "0";

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Cache Statistics</CardTitle>
        <CardDescription>Overview of cache performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Cache Hit Rate</p>
            <p className="text-2xl font-bold text-green-500">{cacheRate}%</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Cached Requests</p>
              <p className="text-xl font-semibold text-green-600">
                {cacheCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Uncached Requests</p>
              <p className="text-xl font-semibold text-indigo-600">
                {uncacheCount}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-xl font-semibold text-purple-600">{total}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Usage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("activity");
  const [timeRange, setTimeRange] = React.useState<TimeRange>("6m");
  const dispatch = useDispatch<AppDispatch>();
  const { usage } = useSelector((state: RootState) => state.usage);
  const { user } = useAuth();
  const hourlyData = React.useMemo(
    () => getHourlyData(usage?.usageRecord || []),
    [usage]
  );

  const monthlyData = React.useMemo(
    () => getMonthlyData(usage?.usageRecord || []),
    [usage]
  );
  React.useEffect(() => {
    if(user){
      dispatch(getApiUsage());
    }
  }, [dispatch,user]);

  return (
    <div className="p-6 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as ActiveTab)}
          >
            <TabsList className="grid w-[200px] grid-cols-2 bg-gray-100">
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="cost"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Cost
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Select
            value={timeRange}
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px] bg-white border-gray-300">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Tabs value={activeTab}>
              <TabsContent value="activity">
                <div className="grid gap-6 md:grid-cols-3">
                  <HourlyChart data={hourlyData} />
                  <CacheStatsCard
                    cacheCount={usage?.cacheCount || 0}
                    uncacheCount={usage?.uncacheCount || 0}
                  />
                  <MonthlyChart data={monthlyData} />
                </div>
              </TabsContent>
              <TabsContent value="cost">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="bg-white border border-gray-200 shadow-sm col-span-2">
                    <CardHeader>
                      <CardTitle>Cost Analysis</CardTitle>
                      <CardDescription>Coming soon</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-gray-400">
                      Cost analysis features will be added here
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Usage;
