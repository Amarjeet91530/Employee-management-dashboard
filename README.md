# Employee Management System

A simple employee management dashboard built while learning full-stack web development. The project uses the MERN stack for the web application and includes a small C++ module for practicing employee data operations.

## Tech Stack

- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- Axios
- C++ (STL/vector)

## Features

- Add new employees
- Edit employee details
- Delete employees
- Search employees by name, email or role
- Filter by department
- Track active/inactive status
- Store salary and contact details
- REST API connected to MongoDB
- Responsive dashboard

## Project Structure

```text
client/     React frontend
server/     Express REST API and MongoDB model
cpp/        C++ employee data operations
```

## Run locally

### 1. Start MongoDB

Use a local MongoDB server or MongoDB Atlas.

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Update `MONGO_URI` in `.env` with your MongoDB connection string.

### 3. Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL shown by Vite.

## C++ demo

```bash
g++ cpp/employee_operations.cpp -o employee_demo
./employee_demo
```

## What I learned

This project helped me practice connecting a React frontend to an Express API, designing a basic MongoDB schema, handling CRUD operations, and keeping frontend and backend code separated. The C++ file is included to demonstrate the same employee-management idea using vectors, structs and simple searching.
