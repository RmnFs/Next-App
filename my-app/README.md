# 🍽️ FoodHub Frontend

A responsive food‑themed web application built with **Next.js 16 (App Router)**,  
featuring authentication with **NextAuth.js**, recipe management,  
and integration with a **MongoDB‑powered backend API**.

---

## 🚀 Live URLs

- **Frontend (Netlify):** https://your-site-name.netlify.app  
- **Backend (Vercel):** https://foodhubbackend-xxxx.vercel.app

---

## 🧩 Features

- 7‑section **Landing Page**
- Browse **Recipes** (fetched from live backend)
- Dynamic **Recipe Details** page (with step‑by‑step cooking instructions)
- **Google Login** powered by NextAuth.js
- Protected pages:  
  - `Add Recipe` – authenticated users can create recipes  
  - `Manage Recipes` – view / delete user recipes
- **Search bar** filters public recipes instantly
- Fully responsive and consistent **orange‑600 theme (Tailwind)**

---

## ⚙️ Tech Stack

**Frontend:** Next.js 16, TypeScript, Tailwind CSS  
**Auth:** NextAuth.js (Google Provider)  
**Backend:** Express + MongoDB (hosted on Vercel)  
**Deployment:**  
- Frontend → Netlify  
- Backend → Vercel  

---

## 🔧 Environment Variables

Create a `.env.local` file in the project root before running locally:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxx
NEXT_PUBLIC_API_URL=https://backend-xxx.com
```

When deployed on Netlify, add the same variables in  
**Site → Settings → Environment Variables**.

---

## 🧠 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open locally
http://localhost:3000
```

The app will fetch data from the local backend (`http://localhost:8080`)  
unless overridden by the `NEXT_PUBLIC_API_URL` variable.

---



---

## 🧮 API Reference

All data is served by your backend:

| Method | Endpoint | Purpose |
| ------- | -------- | ------- |
| `GET` | `/api/foods` | Get all recipes |
| `GET` | `/api/foods/:id` | Get single recipe |
| `POST` | `/api/foods` | Add new recipe |
| `PUT` | `/api/foods/:id` | Edit a recipe |
| `DELETE` | `/api/foods/:id` | Delete recipe |





