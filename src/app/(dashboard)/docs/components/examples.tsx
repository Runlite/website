import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TerminalCode } from "./termialCode";

const API_EXAMPLES = {
  python: `
import requests

def make_api_request(api_key, code):
    API_URL = 'https://api.yourplatform.com/compile'
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    data = {
        'language': 'python',
        'code': code,
        'input': ''
    }
    
    response = requests.post(API_URL, json=data, headers=headers)
    
    if response.status_code == 200:
        result = response.json()
        print(f"Output: {result['output']}")
        print(f"Execution Time: {result['execution_time']} ms")
    else:
        print(f"Error: {response.status_code} - {response.text}")

# Usage
API_KEY = 'YOUR_API_KEY'
code_to_run = 'print("Hello, World!")'
make_api_request(API_KEY, code_to_run)
`,
  javascript: `
const fetch = require('node-fetch');

async function makeApiRequest(apiKey, code) {
    const API_URL = 'https://api.yourplatform.com/compile';
    const headers = {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
    };
    const data = {
        language: 'javascript',
        code: code,
        input: ''
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();
        
        if (response.ok) {
            console.log(\`Output: \${result.output}\`);
            console.log(\`Execution Time: \${result.execution_time} ms\`);
        } else {
            console.error(\`Error: \${response.status} - \${result.message}\`);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Usage
const API_KEY = 'YOUR_API_KEY';
const codeToRun = 'console.log("Hello, World!");';
makeApiRequest(API_KEY, codeToRun);
`,
  java: `
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ApiExample {
    private static final String API_URL = "https://api.yourplatform.com/compile";

    public static void makeApiRequest(String apiKey, String code) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        ObjectMapper mapper = new ObjectMapper();

        Map<String, String> requestBody = Map.of(
            "language", "java",
            "code", code,
            "input", ""
        );

        String jsonBody = mapper.writeValueAsString(requestBody);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(API_URL))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            Map<String, Object> result = mapper.readValue(response.body(), Map.class);
            System.out.println("Output: " + result.get("output"));
            System.out.println("Execution Time: " + result.get("execution_time") + " ms");
        } else {
            System.out.println("Error: " + response.statusCode() + " - " + response.body());
        }
    }

    public static void main(String[] args) throws Exception {
        String API_KEY = "YOUR_API_KEY";
        String codeToRun = "System.out.println(\\"Hello, World!\\");";
        makeApiRequest(API_KEY, codeToRun);
    }
}
`,
  csharp: `
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class ApiExample
{
    private static readonly string API_URL = "https://api.yourplatform.com/compile";

    static async Task MakeApiRequest(string apiKey, string code)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

        var requestData = new
        {
            language = "csharp",
            code = code,
            input = ""
        };

        var json = JsonConvert.SerializeObject(requestData);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await client.PostAsync(API_URL, content);

        if (response.IsSuccessStatusCode)
        {
            var resultString = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<dynamic>(resultString);
            Console.WriteLine($"Output: {result.output}");
            Console.WriteLine($"Execution Time: {result.execution_time} ms");
        }
        else
        {
            Console.WriteLine($"Error: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
        }
    }

    static async Task Main(string[] args)
    {
        string API_KEY = "YOUR_API_KEY";
        string codeToRun = "Console.WriteLine(\\"Hello, World!\\");";
        await MakeApiRequest(API_KEY, codeToRun);
    }
}
`,
  typescript: `
import fetch from 'node-fetch';

interface ApiResponse {
    output: string;
    execution_time: number;
    message?: string;
}

async function makeApiRequest(apiKey: string, code: string): Promise<void> {
    const API_URL = 'https://api.yourplatform.com/compile';
    const headers = {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
    };
    const data = {
        language: 'typescript',
        code: code,
        input: ''
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const result: ApiResponse = await response.json();
        
        if (response.ok) {
            console.log(\`Output: \${result.output}\`);
            console.log(\`Execution Time: \${result.execution_time} ms\`);
        } else {
            console.error(\`Error: \${response.status} - \${result.message}\`);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Usage
const API_KEY = 'YOUR_API_KEY';
const codeToRun = 'console.log("Hello, World!");';
makeApiRequest(API_KEY, codeToRun);
`,
  php: `
<?php
function makeApiRequest($apiKey, $code) {
    $apiUrl = 'https://api.yourplatform.com/compile';
    $data = [
        'language' => 'php',
        'code' => $code,
        'input' => ''
    ];

    $options = [
        'http' => [
            'method' => 'POST',
            'header' => [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json'
            ],
            'content' => json_encode($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($apiUrl, false, $context);

    if ($result === FALSE) {
        echo "Error: Unable to make the request\\n";
    } else {
        $response = json_decode($result, true);
        echo "Output: " . $response['output'] . "\\n";
        echo "Execution Time: " . $response['execution_time'] . " ms\\n";
    }
}

// Usage
$API_KEY = 'YOUR_API_KEY';
$codeToRun = 'echo "Hello, World!";';
makeApiRequest($API_KEY, $codeToRun);
`,
  rust: `
use reqwest::Client;
use serde_json::{json, Value};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let api_key = "YOUR_API_KEY";
    let code_to_run = r#"println!("Hello, World!");"#;

    let client = Client::new();
    let res = client.post("https://api.yourplatform.com/compile")
        .header("Authorization", format!("Bearer {}", api_key))
        .json(&json!({
            "language": "rust",
            "code": code_to_run,
            "input": ""
        }))
        .send()
        .await?;

    if res.status().is_success() {
        let result: Value = res.json().await?;
        println!("Output: {}", result["output"]);
        println!("Execution Time: {} ms", result["execution_time"]);
    } else {
        println!("Error: {} - {}", res.status(), res.text().await?);
    }

    Ok(())
}
`,
  go: `
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

const API_URL = "https://api.yourplatform.com/compile"

func makeApiRequest(apiKey, code string) error {
    requestBody, err := json.Marshal(map[string]string{
        "language": "go",
        "code":     code,
        "input":    "",
    })
    if err != nil {
        return err
    }

    req, err := http.NewRequest("POST", API_URL, bytes.NewBuffer(requestBody))
    if err != nil {
        return err
    }

    req.Header.Set("Authorization", "Bearer "+apiKey)
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return err
    }

    if resp.StatusCode == http.StatusOK {
        var result map[string]interface{}
        json.Unmarshal(body, &result)
        fmt.Printf("Output: %s\\n", result["output"])
        fmt.Printf("Execution Time: %.2f ms\\n", result["execution_time"])
    } else {
        fmt.Printf("Error: %d - %s\\n", resp.StatusCode, string(body))
    }

    return nil
}

func main() {
    apiKey := "YOUR_API_KEY"
    codeToRun := \`fmt.Println("Hello, World!")\`
    err := makeApiRequest(apiKey, codeToRun)
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
    }
}
`,
  ruby: `
require 'net/http'
require 'uri'
require 'json'

def make_api_request(api_key, code)
  uri = URI.parse('https://api.yourplatform.com/compile')
  request = Net::HTTP::Post.new(uri)
  request['Authorization'] = "Bearer #{api_key}"
  request['Content-Type'] = 'application/json'
  request.body = {
    language: 'ruby',
    code: code,
    input: ''
  }.to_json

  response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
    http.request(request)
  end

  if response.code == '200'
    result = JSON.parse(response.body)
    puts "Output: #{result['output']}"
    puts "Execution Time: #{result['execution_time']} ms"
  else
    puts "Error: #{response.code} - #{response.body}"
  end
rescue StandardError => e
  puts "Error: #{e.message}"
end

# Usage
API_KEY = 'YOUR_API_KEY'
code_to_run = 'puts "Hello, World!"'
make_api_request(API_KEY, code_to_run)
`,
};

export default function Examples() {
  return (
    <div className="space-y-6">
      <p className="text-gray-700 leading-relaxed">
        Below are examples of how to implement API requests to compile and run
        code using our service in different programming languages:
      </p>
      <Tabs defaultValue="python" className="w-full">
        <TabsList
          className="flex items-center"
          aria-label="Programming languages"
        >
          {Object.keys(API_EXAMPLES).map((lang) => (
            <TabsTrigger
              key={lang}
              value={lang}
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
              aria-label={`${lang} example`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(API_EXAMPLES).map(([lang, code]) => (
          <TabsContent key={lang} value={lang}>
            <TerminalCode code={code} language={lang} />
          </TabsContent>
        ))}
      </Tabs>
      <p className="text-gray-700 mt-4">
        These examples demonstrate how to make API requests to compile and run
        code using our service. Remember to replace YOUR_API_KEY with your
        actual API key. Each example includes error handling and uses modern
        coding practices for improved readability and maintainability.
      </p>
    </div>
  );
}
