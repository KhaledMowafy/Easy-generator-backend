# Easy Generator API

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red?logo=nestjs)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Swagger](https://img.shields.io/badge/Swagger-UI-green?logo=swagger)](https://swagger.io/tools/swagger-ui/)
[![License: UNLICENSED](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)]()

A simple authentication API built with **NestJS**, **MongoDB**, and **JWT**. Includes Swagger documentation and best practices for security, validation, and error handling.

---

## 🔧 Features

- JWT-based Authentication (Sign Up / Sign In)
- Password hashing with bcrypt
- Protected route with `@UseGuards`
- Swagger API docs at `/api`
- Logger service integration
- DTO validation using `class-validator`
- Centralized error handling
- ESLint + Prettier + Jest setup

---

## 📦 Technologies Used

- NestJS `^11.0.1`
- MongoDB (via `mongoose`)
- Passport + JWT strategy
- Swagger + OpenAPI
- TypeScript

---

## 🖥️ Prerequisites

### ✅ Install MongoDB Locally

1. Download from: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install using default options.
3. To **run MongoDB locally**, execute:

```bash
mongod
```

### MongoDB will run on mongodb://localhost:27017 by default.
#### ⚠️ Ensure Mongo is running before starting the app.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/easy-generator.git
cd easy-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App in Development Mode

```bash
npm run start
```
#### The server will start on: http://localhost:3000

## 🧪 API Documentation

After running the project, Swagger docs will be available at:

👉 http://localhost:3000/api

Use this to test:

- POST /auth/signup
- POST /auth/signin
- GET /auth/protected (requires Bearer token)

## 🗂️ Folder Structure

```bash
src/
│
├── auth/                # Auth module (routes, service, DTOs)
├── logger/              # Centralized logging service
├── schemas/             # Mongoose schemas
├── app.module.ts        # Root module
├── main.ts              # App bootstrap & Swagger setup

```

## 💡 Notes

- Make sure MongoDB is running before starting the app.


