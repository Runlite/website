import React from 'react'
import { Card,CardContent } from "../ui/card";
import { CodeBlock } from './CodeBlock';

export default function ErrorHandling() {
  return (
    <>
    <p className="text-gray-700 leading-relaxed mb-6">
      Understanding and handling errors is crucial for building robust
      applications with the Runlite API.
    </p>
    <h3 className="text-2xl font-semibold mb-4">Common Error Codes</h3>
    <div className="space-y-4">
      {[
        {
          code: 400,
          message: "Bad Request - Check your request parameters",
        },
        { code: 401, message: "Unauthorized - Invalid or missing API key" },
        { code: 404, message: "Not Found - Endpoint does not exist" },
        {
          code: 429,
          message: "Too Many Requests - You've hit the rate limit",
        },
        {
          code: 500,
          message: "Internal Server Error - Please contact support",
        },
      ].map((error) => (
        <Card key={error.code}>
          <CardContent className="flex items-center p-4">
            <span className="text-red-500 font-bold mr-4">
              {error.code}
            </span>
            <p className="text-gray-700">{error.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <h3 className="text-2xl font-semibold mt-8 mb-4">
      Error Response Format
    </h3>
    <p className="text-gray-700 mb-4">
      Error responses will have the following JSON structure:
    </p>
    <CodeBlock
      language="json"
      code={`{
"error": {
"code": 400,
"message": "Invalid 'language' parameter"
}
}`}
    />
  </>  )
}
