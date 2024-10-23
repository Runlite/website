"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CostPieChart } from "./charts/pie";

// Define types for our data
type DataPoint = {
  month: string;
  cost: number;
  requests: number;
};

type TimeRange = "1m" | "3m" | "6m" | "1y";
type ActiveTab = "cost" | "activity";

// Mock data (replace with actual API calls in a real application)
const mockData: DataPoint[] = [
  { month: "Jan", cost: 100, requests: 5000 },
  { month: "Feb", cost: 120, requests: 6000 },
  { month: "Mar", cost: 90, requests: 4500 },
  { month: "Apr", cost: 150, requests: 7500 },
  { month: "May", cost: 180, requests: 9000 },
  { month: "Jun", cost: 200, requests: 10000 },
];

interface LineChartComponentProps {
  data: DataPoint[];
  dataKey: keyof DataPoint;
  stroke: string;
  name: string;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({
  data,
  dataKey,
  stroke,
  name,
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
      <XAxis dataKey="month" stroke="#6B7280" />
      <YAxis stroke="#6B7280" />
      <Tooltip
        contentStyle={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
        }}
      />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={stroke}
        strokeWidth={2}
        name={name}
        dot={{ fill: stroke, strokeWidth: 2 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

const Usage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("cost");
  const [timeRange, setTimeRange] = useState<TimeRange>("6m");

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
                value="cost"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Cost
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Activity
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
              <TabsContent value="cost">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="bg-white border border-gray-200 shadow-sm col-span-2">
                    <CardHeader>
                      <CardTitle>Monthly Cost Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LineChartComponent
                        data={mockData}
                        dataKey="cost"
                        stroke="#8B5CF6"
                        name="Cost ($)"
                      />
                    </CardContent>
                  </Card>
                  <CostPieChart />
                </div>
              </TabsContent>
              <TabsContent value="activity">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>API Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LineChartComponent
                        data={mockData}
                        dataKey="requests"
                        stroke="#10B981"
                        name="Requests"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Placeholder for Future Graph</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center text-gray-400">
                      Future graph will be added here
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
