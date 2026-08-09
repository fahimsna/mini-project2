# Mini Project 2 - Authentication API

A RESTful Authentication and Authorization API built with Node.js, Express.js, MongoDB, Mongoose, bcrypt, and JWT.

## Features

- User registration
- Secure password hashing using bcrypt
- User login
- JWT authentication
- Protected routes
- User profile
- Update profile
- Change password
- Delete account
- User/Admin roles
- Admin-only routes
- Authentication middleware
- Authorization middleware

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token (JWT)
- dotenv
- Postman

## Project Structure

authApi/
├── controllers/
│ └── userController.js
├── middleware/
│ ├── authMiddleware.js
│ └── adminMiddleware.js
├── models/
│ └── User.js
├── routes/
│ └── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js

## API Endpoints

| Method | Endpoint                     | Description                  | Authentication |
| ------ | ---------------------------- | ---------------------------- | -------------- |
| POST   | `/api/users/register`        | Register a new user          | No             |
| POST   | `/api/users/login`           | Login and receive JWT        | No             |
| GET    | `/api/users/profile`         | Get logged-in user's profile | Yes            |
| PUT    | `/api/users/profile`         | Update profile               | Yes            |
| PUT    | `/api/users/change-password` | Change password              | Yes            |
| DELETE | `/api/users/profile`         | Delete account               | Yes            |
| GET    | `/api/users/admin`           | Access admin dashboard       | Admin          |

## Authentication Flow

1. User registers with name, email, and password.
2. Password is hashed using bcrypt.
3. User logs in using email and password.
4. Password is verified using bcrypt.
5. A JWT is generated after successful login.
6. The client sends the JWT using the Authorization header.
7. Authentication middleware verifies the JWT.
8. Protected routes are accessible only with a valid token.

## Authorization

The system supports two roles:

- `user`
- `admin`

Admin routes require both:

```text
authMiddleware
        ↓
adminMiddleware
        ↓
Admin Controller
```
