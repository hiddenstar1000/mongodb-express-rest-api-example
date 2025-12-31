import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(connectionString, {
      dbName: "sample_training",
    });
    console.log("Successfully connected to MongoDB.");
    return mongoose;
  } catch (e) {
    console.error("Failed to connect to MongoDB:", e);
    throw e;
  }
}

export { connectToDatabase };
