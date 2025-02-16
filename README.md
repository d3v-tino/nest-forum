# Nest Blogging Web App

## 📌 Description
Nest is a minimalist, modern blogging platform designed for writers and content creators to share their thoughts easily. The goal is to provide a clean, distraction-free writing experience while incorporating essential blog management features. The platform will allow users to create, edit, and delete blog posts with a simple yet powerful interface

## Features

### Core Features (MVP)

- User Authentication: Users can register and log in securely using JWT-based authentication.

- Blog Post Management (CRUD): Users can create, edit, delete, and read blog posts.

- Security & Performance:
  Enforce HTTPS in production.
  Implement CORS policies for secure API access.
  Optimize API requests for response time <200ms.

- API Versioning: All endpoints will follow the /api/v1/ format for future scalability.

## 📂 Project Structure
```bash
/backend
  ├── /config       # Database connection & environment variables
  ├── /controllers  # API logic for authentication, posts
  ├── /models       # Mongoose schemas (User, Post)
  ├── /routes       # Express API routes
  ├── /middleware   # JWT authentication middleware
  ├── server.js     # Main Express server file
/frontend
  ├── /src
  │   ├── /components  # UI components
  │   ├── /pages       # Pages like Home, Profile, Editor
  │   ├── /context     # React Context API for state management
  │   ├── /services    # API calls
  │   ├── App.tsx      # Main App component
  ├── package.json
```

## 🛠️ Local Installation & Setup

1️⃣ Backend Setup
```bash
# Clone repository
cd backend && npm intall
cd backend && npm run dev
```
2️⃣ Frontend Setup
```bash
cd frontend && npm intall
cd frontend && npm run dev
```