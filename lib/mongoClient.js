import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
export const client = new MongoClient(uri);

export async function connectToMongo() {
  try {
    await client.connect();
    const db = client.db("Riddles");
    await db.command({ ping: 1 });
    console.log("Connected to MongoDB Atlas (DB: Riddles)");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
  }
}
