# Runlite - Fastest and Secure Code Compilation Server

Runlite is a high-performance and secure server for compiling code across various programming languages. Built with Docker containers, Compyl provides a sandboxed environment, ensuring safe execution while delivering fast and reliable code compilation and execution.

## Features

- **Multi-language support**: Compile code in JavaScript, TypeScript, Python, Java, C++, and more.
- **Fast and reliable**: Docker-based isolated environments for compiling code efficiently.
- **Secure execution**: Sandbox environments with resource limits, ensuring code is executed safely.
- **Scalability**: Designed for scalability with Docker container management.
- **REST API**: Simple API to send code and retrieve compilation results.
- **Temporary storage**: Executes code in isolated container temp storage, cleaned up after execution.

## Tech Stack

- **Node.js**: Backend framework for handling requests and managing containers.
- **Docker**: Provides sandboxed environments for running and compiling code.
- **TypeScript**: Ensures strong typing and clean, scalable code.
- **Winston**: Logging system to track execution and errors.
