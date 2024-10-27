import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CodeBlock } from './CodeBlock';

export default function Usage() {
  return (
    <>
    <p className="text-gray-700 leading-relaxed mb-6">
      Explore advanced features of the Runlite API to customize execution
      environments and handle complex scenarios.
    </p>
    <h3 className="text-2xl font-semibold mb-4">
      Custom Execution Options
    </h3>
    <p className="text-gray-700 mb-4">
      You can specify additional options in your API request to customize
      the execution environment:
    </p>
    <CodeBlock
      language="json"
      code={`{
"language": "python",
"code": "import sys\nprint(sys.version)",
"options": {
"timeout": 10,
"memory_limit": 256,
"use_cache": false
}
}`}
    />
    <h3 className="text-2xl font-semibold mt-8 mb-4">Handling File I/O</h3>
    <p className="text-gray-700 mb-4">
      For languages that support file operations, you can include file
      content in your request:
    </p>
    <CodeBlock
      language="json"
      code={`{
"language": "python",
"code": "with open('input.txt', 'r') as f:\n    print(f.read())",
"files": [
{
  "name": "input.txt",
  "content": "Hello from a file!"
}
]
}`}
    />
    <h3 className="text-2xl font-semibold mt-8 mb-4">Batch Execution</h3>
    <p className="text-gray-700 mb-4">
      Execute multiple code snippets in a single request:
    </p>
    <CodeBlock
      language="json"
      code={`{
"batch": [
{
  "language": "python",
  "code": "print('Hello from Python')"
},
{
  "language": "javascript",
  "code": "console.log('Hello from JavaScript')"
}
]
}`}
    />
    <Card className="mt-6 bg-blue-50 border-l-4 border-blue-500">
      <CardHeader>
        <CardTitle className="text-blue-700">Pro Tip</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          Use batch execution to run tests across multiple languages or to
          compare performance between different implementations.
        </p>
      </CardContent>
    </Card>
  </>
)
}
