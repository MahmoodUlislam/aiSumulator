// utils/dbConnect.js
import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(
      "mongodb+srv://mahmood:esikidz@reginaconferencecustome.ypvpfpc.mongodb.net/mydatabase", // Add the database name
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default dbConnect;
