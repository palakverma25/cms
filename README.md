# 📝 CMS Project – Full‑Stack with React, Express & MongoDB

A simple Content Management System that allows writers to draft, preview, publish articles and readers to view them via a clean UI.

---

## 🚀 Tech Stack

- **Frontend**: React (Create‑React‑App), React Router, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas)  
- **Deployment**: Frontend on Vercel • Backend on Render  

---

## 📁 Project Structure

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

### 🔹 Backend (Express + MongoDB)

```bash
cd server
npm install

# Create a .env file containing:
MONGO_URI=<your MongoDB Atlas connection string>

npm start
Runs backend at: http://localhost:5000

Sample endpoint: GET /api/articles

🔹 Frontend (React)
bash
Copy
Edit
cd client
npm install

# Create a .env file containing:
REACT_APP_API_BASE=http://localhost:5000

npm start
Runs frontend at: http://localhost:3000

🌍 Production Deployments
Backend (Render): https://cms-1-taim.onrender.com

Frontend (Vercel): https://<your-vercel-url>.vercel.app

(Replace with your actual deployed URLs)

🧪 Features
Writer-friendly admin form with auto-slug generation

Live preview before publishing

Full create and read functionality via Express API

Publicly viewable article listings and detailed pages (/articles/:slug)

Fully deployed with working demos

📌 How to Use
Access the admin form to create and publish articles.

View published articles on the homepage.

Click “Read More” to access full article pages.

🛠 Deployment Overview
Frontend: Hosted on Vercel with client/ as root and vercel.json for routing

Backend: Hosted on Render, with server/ as root

🔧 Future Enhancements
Add authentication (JWT or a third-party provider)

Support rich-text or markdown editors

Enable image uploads

Enhance SEO and make UI mobile-responsive

🙌 Contributing
Feel free to fork, report issues, or submit pull requests to enhance this project!
