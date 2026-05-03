# 🔗 URL Shortener (CodeAlpha Internship)

A full-stack URL shortener built using Node.js, Express, MongoDB Atlas, and a simple frontend.

---
## 🌍 Live Demo

https://url-shortener-m621.onrender.com

---
## 🚀 Features

- Shorten long URLs
- Redirect using short links
- Click tracking
- Copy to clipboard
- Delete links
- View all stored URLs
- Duplicate URL handling

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- HTML, CSS, JavaScript

---

## 📦 Installation

### 1. Clone the repository

```
git clone https://github.com/Ajlanalif/CodeAlpha_URLShortener.git
cd CodeAlpha_URLShortener
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Run the server

```
node server.js
```

### 5. Open in browser

```
http://localhost:5000
```

---

## 🌍 API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | /shorten | Create short URL |
| GET | /:code | Redirect to original URL |
| GET | /api/urls | Get all URLs |
| DELETE | /api/delete/:id | Delete URL |

---

## 📸 Features Preview

- Clean UI with card layout
- Copy button with toast notification
- Click counter tracking

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
MONGO_URI=your_connection_string
PORT=5000
```

---

## 📌 Notes

- Uses MongoDB Atlas (cloud database)
- `.env` file is ignored for security
- Designed for backend learning and internship submission

---

## 👨‍💻 Author

Sayed Ajlan Al Alif 
CSE, Comilla University  


