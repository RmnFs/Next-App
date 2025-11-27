import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const client = new MongoClient(process.env.DB_URI);
        await client.connect();
        const db = client.db("foodHub_db");

        // Check if user exists
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            await client.close();
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        const result = await db.collection("users").insertOne(newUser);
        await client.close();

        return NextResponse.json({
            id: result.insertedId,
            name: newUser.name,
            email: newUser.email
        }, { status: 201 });

    } catch (err) {
        console.error("Register error:", err);
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}
