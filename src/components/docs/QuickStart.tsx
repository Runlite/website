import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CodeBlock } from "./CodeBlock";

export default function QuickStart() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed mb-6">
        Get started with Runlite API in just a few steps. This guide will walk
        you through making your first API request to compile and execute code.
      </p>
      <h3 className="text-2xl font-semibold mb-4">
        Step 1: Prepare Your Request
      </h3>
      <p className="text-gray-700 mb-4">
        Create a POST request to the following endpoint:
      </p>
      <CodeBlock language="plaintext" code="https://api.runlite.app/v1" />
      <h3 className="text-2xl font-semibold mt-8 mb-4">Step 2: Set Headers</h3>
      <p className="text-gray-700 mb-4">
        Include these headers in your request:
      </p>
      <CodeBlock
        language="plaintext"
        code={`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
      />
      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Step 3: Prepare Request Body
      </h3>
      <p className="text-gray-700 mb-4">
        Your request body should be a JSON object with the following structure:
      </p>
      <CodeBlock
        language="json"
        code={`{
"lang": "1078" // Language ID for python,
"syntax": "print('Hello, Runlite!')"
}`}
      />
      <p className="text-blue-700 mb-4">
        Language code can be found in Supported Languages section
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Step 4: Send the Request
      </h3>
      <p className="text-gray-700 mb-4">{"Here's"} an example using cURL:</p>
      <CodeBlock
        language="bash"
        code={`curl -X POST \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{"language": "python", "code": "print('Hello, Runlite!')"}' \\
https://api.runlite.app/v1/execute`}
      />
      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Step 5: Interpret the Response
      </h3>
      <p className="text-gray-700 mb-4">
        {"You'll"} receive a JSON response with the execution result:
      </p>
      <CodeBlock
        language="json"
        code={`{
"output": "Hello, Runlite!\\n",
"errors": null,
"execution_time": 0.0054
}`}
      />
      <Card className="mt-6 bg-green-50 border-l-4 border-green-500">
        <CardHeader>
          <CardTitle className="text-green-700">Success!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            {"You've"} just executed your first piece of code using the Runlite
            API. Explore the rest of the documentation to learn about more
            advanced features and options.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
