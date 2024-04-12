import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_VERCEL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default dbConnect;
