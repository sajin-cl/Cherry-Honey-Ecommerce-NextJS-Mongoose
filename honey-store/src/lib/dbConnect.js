import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable not set");
}

// Global cache to prevent multiple connections in dev (Next.js hot reload)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Return existing healthy connection
  if (cached.conn) {
    const state = cached.conn.connection?.readyState;
    // 1 = connected, 2 = connecting
    if (state === 1 || state === 2) return cached.conn;
    // Connection dropped — reset so we reconnect below
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,          // up to 10 concurrent DB operations
        minPoolSize: 2,           // keep 2 connections warm
        serverSelectionTimeoutMS: 5000,  // fail fast if MongoDB unreachable
        socketTimeoutMS: 45000,   // drop idle sockets after 45 s
        connectTimeoutMS: 10000,  // give up initial connect after 10 s
      })
      .catch((err) => {
        // ⚠️ Reset promise so the NEXT request retries a fresh connection
        // Without this the server gets stuck on a permanently rejected promise
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err;
  }

  return cached.conn;
}

export default dbConnect;