# 🔐 AuthFlow – Full-Stack Authentication System

AuthFlow is a full-stack web application that demonstrates a complete user authentication flow. Users can create an account, log in securely, access a protected welcome page, and log out.

## ✨ Features

- **User Registration** – Create a new account.
- **User Login** – Authenticate using registered credentials.
- **JWT Authentication** – Token-based authentication.
- **Protected Routes** – Restrict access to authenticated users.
- **Welcome Dashboard** – Display the authenticated user's welcome page.
- **Logout** – End the user session and redirect to login.
- **Reusable Components** – Shared UI components such as the password input.
- **MongoDB Integration** – Store user information in MongoDB Atlas.

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|---|---|---|
| React | Node.js | MongoDB Atlas |
| Vite | Express.js | |
| CSS | JWT | |

## 🔄 Authentication Flow

```text
User Signup
    ↓
Account Created
    ↓
User Login
    ↓
JWT Authentication
    ↓
Protected Welcome Page
    ↓
Logout
    ↓
Login Page
```

## 📁 Project Structure

```text
AuthFlow/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── ...
│   └── ...
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## 🚀 Live Deployment

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render
- **Database:** MongoDB Atlas

## 💡 What I Learned

- Building a full-stack application using React and Express.
- Connecting a frontend to backend REST APIs.
- Implementing JWT-based authentication.
- Working with MongoDB Atlas.
- Managing protected routes and user sessions.
- Deploying frontend and backend separately.

## 👨‍💻 Author

**Vedant Agrawal**

[GitHub](https://github.com/vedantagarwal1977-oss)
