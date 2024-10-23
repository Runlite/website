import React from "react";
import { TerminalCode } from "./termialCode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MakeRequest() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed">
        To make a request to compile and run code, use the following endpoint:
      </p>
      <TerminalCode
        code="POST https://api.yourplatform.com/compile"
        language={"bash"}
      />
      <p className="text-gray-700 mt-4 mb-2">Request body:</p>
      <Tabs defaultValue="json" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="json" className="px-4 py-2">
            JSON
          </TabsTrigger>
          <TabsTrigger value="curl" className="px-4 py-2">
            cURL
          </TabsTrigger>
        </TabsList>
        <TabsContent value="json">
          <TerminalCode
            code={`
{
"language": "python",
"syntax": "print('Hello, World!')",
"input": ""  // optional input for the program
}`}
            language={"bash"}
          />
        </TabsContent>
        <TabsContent value="curl">
          <TerminalCode
            code={`
curl -X POST https://api.yourplatform.com/compile \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
"language": "python",
"syntax": "print('Hello, World!')",
"input": ""
}'`}
            language={"bash"}
          />
        </TabsContent>
      </Tabs>
      <p className="text-gray-700 mt-4">
        The API will return a response with the compilation result and output.
      </p>
    </>
  );
}
