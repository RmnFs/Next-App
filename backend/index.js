require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");

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
    process.exit(1); // stop if it can't connect
  }
}

const app = express();
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => res.send("🍽️ FoodHub backend is running ✅"));

// Routes
app.get("/api/foods", async (req, res) => {
  
  try {
    const db = await connectDB();
    const foods = await db.collection("foods").find().sort({ _id: -1 }).toArray();
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
});


app.get("/api/foods/:id", async (req, res) => {
  console.log("Requested ID:", req.params.id);
  try {
    const db = await connectDB();
    const { id } = req.params;
    const food = await db.collection("foods").findOne({ _id: new ObjectId(id) });

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

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

app.put("/api/foods/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const result = await db
      .collection("foods")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.json({ modified: result.modifiedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/api/foods/:id", async (req, res) => {
  try {
    const db = await connectDB();
    const { id } = req.params;
    const result = await db.collection("foods").deleteOne({ _id: new ObjectId(id) });
    res.json({ deleted: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

const PORT = process.env.PORT || 5000;

// Keep server alive
app.listen(PORT, () => {
  console.log(`✅ FoodHub backend running on port ${PORT}`);
}).on("error", (err) => console.error("❌ Server failed:", err));