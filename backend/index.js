// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

// --- Mongo connection ---
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let db;
async function connectDB() {
  if (db) return db;
  try {
    await client.connect();
    db = client.db("foodHub_db");
    console.log("✅ Connected to MongoDB (foodHub_db)");
    return db;
  } catch (err) {
    console.error("❌ Failed DB connection:", err);
    throw err; // don't exit — let Vercel report failure
  }
}

// --- Express app ---
const app = express();
app.use(
  cors({
    origin: "*", // you can replace with your frontend URLs later
  })
);
app.use(express.json());

// Base route
app.get("/", (_req, res) => {
  res.send("🍽️ FoodHub backend is running ✅ (from Vercel)");
});

// ---- API routes ----

// Get all foods
app.get("/api/foods", async (_req, res) => {
  try {
    const db = await connectDB();
    const foods = await db.collection("foods").find().sort({ _id: -1 }).toArray();
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Get single food
app.get("/api/foods/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const food = await db.collection("foods").findOne({ _id: new ObjectId(id) });
    if (!food) return res.status(404).json({ error: "Food not found" });
    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Add new food
app.post("/api/foods", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("foods").insertOne(req.body);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Add failed" });
  }
});

// Update food
app.put("/api/foods/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("foods")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json({ modified: result.modifiedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete food
app.delete("/api/foods/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("foods")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ deleted: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ✅ Vercel serverless export (DON'T app.listen)
module.exports = app;