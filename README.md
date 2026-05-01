# 💰 Expense Tracker (Fenmo Assessment)

## 🚀 Live Demo

Frontend: https://your-app.vercel.app
Backend: https://your-app.onrender.com

---

## 🧩 Features

* Add new expense (amount, category, description, date)
* View all expenses
* Filter by category
* Sorted by newest date (default)
* Total expense calculation
* Handles duplicate submissions (idempotent API)

---

## ⚙️ Tech Stack

* Frontend: React (Vite)
* Backend: Node.js + Express
* Storage: In-memory (for simplicity)

---

## 🧠 Design Decisions

* Implemented idempotency using unique IDs + payload comparison
* Default sorting applied on backend and frontend for consistency
* Simple UI to focus on correctness and functionality

---

## ⚠️ Trade-offs

* No database used (time constraint)
* Minimal styling (focus on functionality)

---

## 🧪 Edge Cases Handled

* Duplicate requests (retry-safe)
* Empty states
* Invalid inputs (negative amount)
* Loading states

---

## ▶️ Run Locally

### Backend

```bash
cd server
npm install
node index.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```
