# Todo task Website

Welcome to our Todo task project! This project is built using React.js for the frontend, Node.js for the backend, and MongoDB for the database.

## Introduction

This project is todo list app

## Features

- User Authentication:
  - Sign up and sign in using JSON Web Tokens (JWT) for secure authentication.
- Todo Tasks:
  - Add tasks and mark them done when completed

## Getting Started

### Prerequisites

- Node.js and npm: Make sure you have Node.js and npm installed. You can download them from https://nodejs.org/.

### Installation

1. Clone the repository:

   ```sh
   git clone 
   ```
2. Install the main dependencies in the root folder:
  
    ```
    npm install
    ```
2. Install frontend dependencies:

   ```sh
    cd frontend
    npm install
   ```

3. Create a .env.development.local and .env.production.local files in the frontend directory and configure your environment variables:

   ```
   for prod: REACT_APP_API_BASE_URL= http://prod-server-link/
   for dev: REACT_APP_API_BASE_URL=http://localhost:3000/v1/api/
   ```

4. Install backend dependencies:

   ```sh
    cd backend
    npm install
   ```

5. Create a .env file in the backend directory and configure your environment variables:

   ```
   DB_CONNECTION_STR=mongodb://localhost/your-database-name
   SECRET_KEY=your-secret-key
   ```

6. Start both the servers 

   ```
   # In the root directory
   npm start
   ```
