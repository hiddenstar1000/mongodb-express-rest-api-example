import { MongoClient, Db } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db: Db;

async function connectToDatabase(): Promise<Db> {
  try {
    const conn = await client.connect();
    db = conn.db("sample_training");
    console.log("Successfully connected to MongoDB.");
    return db;
  } catch (e) {
    console.error("Failed to connect to MongoDB:", e);
    throw e;
  }
}

export { connectToDatabase, db };
export default db;

