import React from "react";
import { Card,CardContent,CardHeader,CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
export default function Introduction():React.ReactNode {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-6">
        Welcome to Runlite API documentation. Our API provides a lightning-fast
        solution for compiling and executing code across multiple programming
        languages. Whether {"you're"} building an online IDE, a coding education
        platform, or integrating code execution into your application, Runlite
        offers the speed and flexibility you need.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Support for 30+ programming languages</li>
            <li>Blazing fast compilation and execution times</li>
            <li>Secure, isolated execution environments</li>
            <li>Customizable resource limits</li>
            <li>Detailed output and error reporting</li>
            <li>Real-time execution status updates</li>
          </ul>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Getting Started</h3>
        <Tabs defaultValue="signup">
          <TabsList>
            <TabsTrigger value="signup">1. Sign Up</TabsTrigger>
            <TabsTrigger value="apikey">2. Get API Key</TabsTrigger>
            <TabsTrigger value="request">3. Make a Request</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <p>
              Create your Runlite account at{" "}
              <a
                href="https://runlite.app/signup"
                className="text-blue-600 hover:underline"
              >
                https://runlite.app/signup
              </a>
            </p>
          </TabsContent>
          <TabsContent value="apikey">
            <p>
              Generate your API key in the Runlite dashboard under API Settings
            </p>
          </TabsContent>
          <TabsContent value="request">
            <p>Make your first API request using our quick start guide</p>
            <Button variant="outline" className="mt-2">
              <a href="#quickstart">View Quick Start Guide</a>
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
