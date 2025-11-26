

---

# **FoodHub Backend**

A lightweight **Express.js** server that acts as the backend for the FoodHub project.  
Used for testing APIs and mock connections to the Next.js frontend during development.

---

## **📁 Project Structure**
```
backend/
 ├─ index.js              # main Express server entry
 ├─ package.json          # backend dependencies and scripts
 ├─ .env                  # environment variables (PORT, API keys, etc.)
 └─ node_modules/
```

---

## **🚀 Setup and Run**

### **1️⃣ Install dependencies**
```bash
cd backend
npm install
```

### **2️⃣ Create a `.env` file**
```bash
PORT=8080
```

### **3️⃣ Start the server**
```bash
node index.js
```

or (if using nodemon)
```bash
npx nodemon index.js
```

Server runs at:  
👉 [http://localhost:8080](http://localhost:8080)

---

## **⚙️ index.js Example**

```js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("✅ FoodHub backend is running successfully!");
});

// Sample data route 
app.get("/api/recipes", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Chocolate Cake",
      desc: "A rich chocolate dessert",
    },
    {
      id: 2,
      title: "Hyderabadi Biryani",
      desc: "Fragrant rice layered with spices and meat",
    },
  ]);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## **🧠 Features**
- Simple and modular Express setup  
- CORS enabled for connection to your Next.js frontend  
- Ready to extend with routes for:
  - Product or Recipe CRUD APIs  
  - Authentication backends if needed later  

---

## **🧩 Integration with Frontend**
The FoodHub **Next.js frontend** can call backend routes using `fetch` or `axios`, for example:
```ts
const res = await fetch("http://localhost:8080/api/recipes");
const data = await res.json();
```

---

