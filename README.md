# 💰 Finance Data Processing & Access Control Backend

A backend system built using **Node.js, Express, and MongoDB Atlas** that manages financial records with **role-based access control (RBAC)** and provides **dashboard analytics**.

---

# 🚀 Live Deployment

* 🌐 **Live API (Render):**
  https://finance-backend-gi5m.onrender.com/

* 📮 **API Documentation (Postman):**
  https://documenter.getpostman.com/view/40544039/2sBXiqDnyr

---

# 🧠 Features

## 🔐 Authentication & Authorization

* JWT-based authentication
* Secure login system
* Role-based access control (RBAC)

## 👤 User Management

* Admin can create and manage users
* Roles supported:

  * **Admin** → Full access
  * **Analyst** → View records + analytics
  * **Viewer** → Dashboard only

## 💰 Financial Records

* Create, update, delete records (Admin only)
* View records (Admin + Analyst)
* Filtering:

  * By type (income/expense)
  * By category
  * By date range
* Pagination support

## 📊 Dashboard Analytics

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Monthly trends
* Recent transactions (restricted by role)

---

# 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud)
* **Authentication:** JWT
* **Deployment:** Render

---

# 🔐 Role-Based Access Control

| Role    | Permissions                               |
| ------- | ----------------------------------------- |
| Admin   | Full access (users + records + dashboard) |
| Analyst | View records + dashboard                  |
| Viewer  | Dashboard only (no raw records)           |

---

# ⚙️ Local Setup (Optional)

> ⚠️ You **DO NOT need to run locally** to test this project.
> The API is already deployed on Render and connected to MongoDB Atlas.

If you still want to run locally:

```bash
git clone https://github.com/your-username/finance-backend.git
cd finance-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

Run the server:

```bash
npm run dev
```

---

# 🧪 API Testing

You can test APIs using:

* 📮 **Postman Documentation (Recommended):**
  https://documenter.getpostman.com/view/40544039/2sBXiqDnyr

* 🌐 **Live API Base URL:**
  https://your-app.onrender.com

---

## 🔑 Authentication

Login to get token:

```
POST /api/auth/login
```

Example:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Use token in headers:

```
Authorization: Bearer <token>
```

---

# 📌 Important Notes

* MongoDB Atlas is used → No local database setup required
* Backend is deployed on Render → No server setup required
* Role-based restrictions are strictly enforced
* Viewer users cannot access raw records

---

# 🧠 Design Decisions

* Used MongoDB for flexible schema and aggregation
* Implemented RBAC using middleware
* Used JWT for stateless authentication
* Aggregation pipelines used for dashboard analytics

---

# 📊 Example API Endpoints

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| POST   | /api/auth/login | Login user                   |
| POST   | /api/users      | Create user (Admin)          |
| GET    | /api/users      | Get users (Admin)            |
| POST   | /api/records    | Create record (Admin)        |
| GET    | /api/records    | Get records (Admin, Analyst) |
| GET    | /api/dashboard  | Dashboard summary            |

---

# 🎯 Assumptions

* Users are created only by Admin
* JWT tokens are used for authentication
* Viewer access is limited to aggregated data only
* Records are globally visible (no user-specific isolation)

---

# 📦 Submission Summary

* ✅ GitHub Repository
* ✅ Live API (Render)
* ✅ MongoDB Atlas (Cloud DB)
* ✅ Postman API Documentation

---

