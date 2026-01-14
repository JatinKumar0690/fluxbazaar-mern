FluxBazaar 🛒
A full‑stack MERN e‑commerce platform built and deployed in production using Render (backend) and Vercel (frontend).

FluxBazaar supports authentication, product browsing, cart management, order placement, and online payments.


🚀 Live Demo
Frontend (Vercel): https://fluxbazaar-mern.vercel.app
Backend (Render): https://fluxbazaar-backend.onrender.com


🧠 Why this project matters
FluxBazaar is not just a CRUD project. It handles real-world production deployment, environment management, CORS handling, API integration, and payment workflows.

This project was debugged and fixed in production — similar to how real engineering teams work.

✨ Features

User authentication (JWT based)

Product listing 

Add to cart / update cart / remove from cart

Order creation & order history (per user)

Online payment integration

Protected routes

Client-side routing with refresh support


🛠 Tech Stack

Frontend

React (Vite)

Redux Toolkit

Axios

Bootstrap 

Deployed on Vercel




Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Deployed on Render



🧪 Key Production Issues Solved

Removed hardcoded localhost URLs and migrated to env‑based APIs

Fixed CORS issues between Vercel & Render

Resolved MongoDB Atlas IP whitelist issues

Handled routing 404 on refresh using Vercel rewrites

Fixed missing dependencies 

Corrected payment API route mismatches


🧠 What I learned
Real‑world deployment is very different from local development
Environment variables are injected at build time (Vite)
How productin debugging improves code quality






👤 Author

Jatin Kumar  
Full-Stack Developer (MERN)

⭐ If you like this project, feel free to star the repo!