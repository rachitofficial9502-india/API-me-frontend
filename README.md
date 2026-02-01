# Profile Frontend (React)

A clean, minimal React frontend for the **Profile API** backend.

---

## ✨ Features

- Separate frontend application (decoupled from backend)
- Fetches profile data from REST API
- Displays:
  - Name & bio
  - Skills
  - Projects
- Global search (skills + projects)
- Responsive, clean UI
- No state management libraries
- No CSS frameworks

---

## 🧱 Tech Stack

- React (Vite)
- JavaScript
- Fetch API
- Plain CSS (inline for now)

---

## 📁 Project Structure

```
frontend/
├── src/
│ ├── App.jsx # Main application component
│ ├── main.jsx # React entry point
│
├── index.html
├── package.json
└── vite.config.js
```


---

## 🔌 Backend Dependency

This frontend expects the backend API to be running.

Make sure the backend is running before starting the frontend.

## Getting Started

Install dependencies
npm install

Start development server
npm run dev

The app will be available at:
http://localhost:5173

## Search Functionality

The search bar uses the backend endpoint:
GET /api/search?q=<query>

It searches across:
Skills
Projects (title + tech stack)

Search results are rendered dynamically without page reload.
