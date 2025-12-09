# 📘 API Integration Project – README

## 🚀 Overview

This project is a simple API Integration assignment built using **Node.js + Express**.
It fetches data from **two public REST API endpoints**, caches the response locally, and exposes clean API routes with filtering and detailed views.

This fulfills the requirements of the **GLOBAL TREND – API Integration Internship Assignment**.

---

## ⭐ Features

* Fetch data from **JSONPlaceholder** (Posts + Users)
* Cache responses locally (`cache.json`)
* API endpoints for:

  * Listing with filtering
  * Viewing details by ID
* Error handling for:

  * Network failure
  * Timeout
  * Malformed responses
* Simple, readable code structure

---

## 🛠 Tech Stack

* Node.js
* Express.js
* Axios
* File System (fs) for caching

---

## 📁 Project Structure

```
project/
│── src/
│   ├── server.js        # Entry point
│   ├── apiClient.js     # Fetch + error handling
│   └── routes.js        # Express routes
│── cache.json           # Cached API data
│── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start the server

```
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### 1️⃣ Get all posts (with filters)

```
GET /api/posts
```

**Optional Filters**

```
GET /api/posts?userId=1
GET /api/posts?title=qui
```

---

### 2️⃣ Get single post by ID

```
GET /api/posts/:id
```

Example:

```
GET /api/posts/5
```

---

### 3️⃣ Get all users

```
GET /api/users
```

---

### 4️⃣ Get single user by ID

```
GET /api/users/:id
```

---

### 5️⃣ Force refresh API (ignore cache)

```
GET /api/refresh
```

---

## 🧠 How Caching Works

1. When `/posts` or `/users` is requested:

   * If cache exists → return cached data
   * Else → fetch from API, save to `cache.json`, then return

2. When `/refresh` is called:

   * Always fetch fresh data
   * Overwrite old cache

This reduces API calls and speeds up responses.

---

## 🛡 Error Handling Includes

* Network failure fallback to cache
* Timeout handling for Axios
* Invalid/malformed API response
* Missing cache file scenario

---

## 📌 Endpoints Used (JSONPlaceholder)

* `https://jsonplaceholder.typicode.com/posts`
* `https://jsonplaceholder.typicode.com/users`

---

## 📝 Notes / Assumptions

* Caching is file-based for simplicity
* Only GET routes needed as per assignment
* No database required
