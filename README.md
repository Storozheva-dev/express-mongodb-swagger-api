# 🚀 Fullstack Node.js API Project

A complete backend project demonstrating full-cycle REST API development with Node.js, Express, MongoDB, Swagger documentation, and email notifications.

## 📖 Project Overview

This project showcases the complete development process of a RESTful API, from basic Express server to fully documented production-ready backend with multiple features.

## 🌟 Features

- **RESTful API** - Complete CRUD operations
- **Swagger Documentation** - Auto-generated API docs
- **MongoDB Integration** - Database with Mongoose ODM
- **JWT Authentication** - Secure user authentication
- **Email Notifications** - Nodemailer integration
- **Environment Configuration** - Professional setup

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Documentation:** Swagger/OpenAPI
- **Authentication:** JWT, bcrypt
- **Emails:** Nodemailer
- **Validation:** Joi, validation middleware

## 📁 Project Branches

| Branch | Features | Technologies |
|--------|----------|-------------|
| `hw7-swagger` | Complete API documentation | Swagger, OpenAPI |
| `hw6-email` | Email notification system | Nodemailer |
| `hw5-auth` | User authentication | JWT, bcrypt |
| `hw4-database` | Database integration | MongoDB, Mongoose |
| `hw3-rest-api` | REST API implementation | Express, REST |
| `hw2-express` | Basic server setup | Express.js |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   git clone https://github.com/Storozheva-dev/fullstack-nodejs-api.git
   cd fullstack-nodejs-api
2. **Install dependencies**
   npm install
3. **Environment setup**
   cp .env.example .env
# Edit .env with your configuration
4. **Run the application**
   npm start

    API Documentation

## 🔍 Accessing Documentation
Once the server is running, you can access the interactive Swagger documentation at:
http://localhost:3000/api-docs

The documentation provides:
- 📋 Complete API endpoint list
- 🔑 Authentication requirements
- 📝 Request/response schemas
- 🧪 Try-it-out functionality
- 📊 Error code descriptions

## 🛣️ Available Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/current` - Get current user

### User Management
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

```javascript
// Request header format:
Authorization: Bearer <your-jwt-token>
