import React from 'react'
import { CodeBlock } from './CodeBlock'
import { Card,CardContent,CardHeader,CardTitle } from "../ui/card";

export default function Limits() {
  return (
    <>
    <p className="text-gray-700 leading-relaxed mb-6">
      To ensure fair usage and maintain service quality, Runlite implements
      rate limiting on API requests.
    </p>
    <h3 className="text-2xl font-semibold mb-4">Rate Limit Tiers</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {[
        { name: "Basic", limit: "100 requests/minute" },
        { name: "Pro", limit: "500 requests/minute" },
        { name: "Enterprise", limit: "Custom limits available" },
      ].map((tier) => (
        <Card key={tier.name}>
          <CardHeader>
            <CardTitle>{tier.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Limit:</strong> {tier.limit}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
    <h3 className="text-2xl font-semibold mt-8 mb-4">
      Handling Rate Limits
    </h3>
    <p className="text-gray-700 mb-4">
      When you exceed your rate limit, {"you'll"} receive a 429 Too Many
      Requests response. The response headers will include:
    </p>
    <CodeBlock
      language="plaintext"
      code={`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1623456789`}
    />
    <p className="text-gray-700 mt-4">
      Implement exponential backoff in your application to handle rate
      limiting gracefully.
    </p>
  </>  )
}
