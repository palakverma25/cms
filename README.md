# 📝 CMS Project – Full‑Stack with React, Express & MongoDB

A simple Content Management System where writers can create, preview, and publish articles — and readers can view them via a clean frontend.

---

## 🚀 Tech Stack

- **Frontend**: React (Create‑React‑App), React Router, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas)  
- **Hosting**: Frontend – Vercel • Backend – Render  

---

## 📦 Repository Structure

/
├── client/ # React frontend (deployed on Vercel)
│ ├── public/
│ ├── src/
│ └── vercel.json
└── server/ # Express backend (deployed on Render)
├── controllers/
├── models/
├── routes/
├── app.js
└── package.json

yaml
Copy
Edit

---

## ⚙️ Getting Started (Local Development)

### 🔹 Backend

```bash
cd server
npm install

# Create .env with:
# MONGO_URI=<your MongoDB Atlas connection string>

npm start
Your backend runs at http://localhost:5000. API example: GET /api/articles.

🔹 Frontend
bash
Copy
Edit
cd client
npm install

# Create .env with:
# REACT_APP_API_BASE=http://localhost:5000

npm start
Your frontend runs at http://localhost:3000.

🌍 Live Demo (Production)
Backend (Render): https://cms-1-taim.onrender.com

Frontend (Vercel): https://your-frontend-url.vercel.app

🧪 Features
Write and auto-slugify articles

Preview before publishing

CRUD functionality via Express API

Public viewable articles with individual pages (/articles/:slug)

Deployed stacks with live demos

📌 Usage
Use Admin form in the frontend to create and publish articles.

Browse published articles on the homepage.

Click “Read More” to view individual articles.

🛠 How to Deploy
Frontend deployed via Vercel (pointed to /client/)

Backend deployed via Render, using server/ as root

🔧 Next Steps (Optional Features)
Add authentication for writers

Support rich-text editors (e.g., Draft.js)

Enable image uploads

Improve SEO and make UI mobile-friendly

🙌 Contributing
Feel free to fork, submit issues, or open pull requests to improve this project!
