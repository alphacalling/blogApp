# 📝 Blog App

A full-stack Blog App built with **Node.js**, **Express**, and **React**. Users can sign up, log in, and manage blog posts — but only if authenticated.

---

## 🔐 Features

- ✅ User Registration & Login
- 🔐 JWT-based Authentication
- 🔒 Protected Routes (Only logged-in users can **add/delete** blogs)
- 🔑 Password Hashing with `bcrypt`
- ✍️ Create, Read, and Delete Blogs

---

## 🚀 Tech Stack

| Layer     | Tech Used                          |
|-----------|------------------------------------|
| Frontend  | React, Vite, Axios                 |
| Backend   | Node.js, Express.js                |
| Database  | MongoDB (via Mongoose)             |
| Security  | JWT, bcrypt                        |

---

## 🧪 API Endpoints

### 🧍‍♂️ User Routes

| Method | Route         | Description                  | Auth |
|--------|---------------|----------------------------- |------|
| POST   | `/api/auth/register` | Register a new user    | ❌ |
| POST   | `/api/auth/login`    | Login & get JWT token  | ❌ |

### 📝 Blog Routes

| Method | Route         | Description              | Auth |
|--------|---------------|--------------------------|------|
| GET    | `/api/blogs`      | Get all blogs         | ❌ |
| POST   | `/api/blogs`      | Create new blog       | ✅ |
| PUT    | `/api/blogs/:id   | Update blog by ID     | ✅ |
| DELETE | `/api/blogs/:id`  | Delete a blog by ID   | ✅ |

---

## 🔐 Auth Flow

1. User registers → password hashed with `bcrypt`.
2. On login → server returns a JWT token.
3. Frontend stores token (in memory or localStorage).
4. Authenticated requests include token in `Authorization` header:
    Authorization: Bearer <token>
5. Server verifies token using middleware before allowing protected actions.
