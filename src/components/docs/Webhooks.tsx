import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CodeBlock } from "./CodeBlock";

export default function Webhooks() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-6">
        Runlite provides webhooks to notify your application about asynchronous
        events, such as long-running code execution completion.
      </p>
      <h3 className="text-2xl font-semibold mb-4">Setting Up Webhooks</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>Go to your Runlite dashboard</li>
        <li>Navigate to the Webhooks section</li>
        <li>Click{ "Add Webhook"}</li>
        <li>Enter the URL where you want to receive webhook events</li>
        <li>Select the events you want to subscribe to</li>
        <li>Save your webhook configuration</li>
      </ol>
      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Webhook Payload Example
      </h3>
      <CodeBlock
        language="json"
        code={`{
"event": "execution.completed",
"execution_id": "exec_123456789",
"status": "success",
"output": "Hello, Runlite!\\n",
"execution_time": 1.5
}`}
      />
      <Card className="mt-6 bg-blue-50 border-l-4 border-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-700">Webhook Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Always verify the authenticity of webhook requests by checking the
            signature in the X-Runlite-Signature header.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
