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
        //  Reset promise so the NEXT request retries a fresh connection
        // Without this the server gets stuck on a permanently rejected promise
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;

    // Automatically migrate products that do not have a slug
    (async () => {
      try {
        const Product = (await import("../models/product.model")).default;
        const productsWithoutSlug = await Product.find({
          $or: [{ slug: { $exists: false } }, { slug: "" }, { slug: null }]
        });
        if (productsWithoutSlug.length > 0) {
          console.log(`[Migration] Found ${productsWithoutSlug.length} products without slug. Migrating...`);
          for (const p of productsWithoutSlug) {
            let baseSlug = p.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            let slug = baseSlug;
            let counter = 1;
            while (true) {
              const exists = await Product.findOne({ slug, _id: { $ne: p._id } }).select("_id").lean();
              if (!exists) break;
              slug = `${baseSlug}-${counter}`;
              counter++;
            }
            await Product.updateOne({ _id: p._id }, { $set: { slug } });
            console.log(`[Migration] Assigned slug "${slug}" to product "${p.name}"`);
          }
          console.log("[Migration] Product slug migration completed successfully.");
        }
      } catch (err) {
        console.error("[Migration] Error migrating product slugs:", err);
      }
    })();

  } catch (err) {
    cached.promise = null;
    console.error(" MongoDB Connection Error:", err.message);
    throw err;
  }

  return cached.conn;
}

export default dbConnect;