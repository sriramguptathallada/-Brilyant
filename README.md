# Task Management API

This project is a RESTful API for creating and managing tasks. It includes various features like request body validation using Joi, logging using Winston, and rate limiting using Express Rate Limiter for enhanced security and performance.

## Features

- **Task Management**: Create, update, delete, and retrieve tasks via RESTful API endpoints.
- **Body Validation**: Uses Joi for validating request bodies to ensure data integrity.
- **Logging**: Integrated logging system using Winston with different log levels:
  - **Debug**: Captures console logs, stores them in a file, and prints them in the terminal.
  - **Info**: Logs successful responses and stores them in a file.
  - **Error**: Logs failed responses and stores them in a file.
- **Security Enhancements**:
  - **Express Rate Limiter**: Prevents abuse by limiting the number of requests from a single IP.
  - **Helmet**: Adds various HTTP headers to secure the app.
  - **XSS-Clean**: Sanitizes user input to prevent cross-site scripting attacks.
  - **CORS**: Configures Cross-Origin Resource Sharing to allow or restrict resources on a web page to be requested from another domain.

## Getting Started

### Prerequisites

- Node.js (>=20.9.0)
- npm (>=9.6.1)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sriramguptathallada/-Brilyant.git
    ```
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

### Configuration

- Configure environment variables in a `.env` file (e.g., port, rate limiting options).

### Running the Application

To start the application in development mode, run:

```bash
npm run dev
