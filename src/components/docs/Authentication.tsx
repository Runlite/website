import React from "react";
import { Card,CardContent,CardHeader,CardTitle } from "../ui/card";
import { CodeBlock } from "./CodeBlock";

export default function Authentication() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-6">
        All requests to the Runlite API must be authenticated using an API key.
        Your API key is your unique identifier and should be kept confidential.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Obtaining Your API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Log in to your Runlite account</li>
            <li>Navigate to API Settings in your dashboard</li>
            <li>Click {"Generate New API Key"}</li>
            <li>Copy and securely store your new API key</li>
          </ol>
        </CardContent>
      </Card>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Using Your API Key</h3>
      <p className="text-gray-700 mb-4">
        Include your API key in the header of each request:
      </p>
      <CodeBlock
        language="bash"
        code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-X POST \\
-d '{"language": "python", "code": "print('Hello, Runlite!')"}' \\
https://api.runlite.app/v1/execute`}
      />
      <Card className="mt-6 bg-yellow-50 border-l-4 border-yellow-500">
        <CardHeader>
          <CardTitle className="text-yellow-700">Security Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Never share your API key or expose it in client-side code. Always
            make API requests from your server to protect your key.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
