/**
 * Admin Seed Script
 * Run: node scripts/seed-admin.mjs
 *
 * Creates an admin user in the database.
 * If the user already exists, updates their role to "admin".
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// ── Load .env.local (no dotenv needed) ────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
try {
  const envFile = readFileSync(envPath, "utf-8");
  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  console.error("❌ Could not read .env.local");
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// ── Admin credentials (change as needed) ──────────────────────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_FULLNAME = process.env.ADMIN_FULLNAME;
// ──────────────────────────────────────────────────────────────────

import mongoose from "mongoose";
// Import existing User model directly (reuses schema + pre-save hash hook)
import User from "../src/models/user.model.js";

async function seed() {
  console.log("🔌 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log("✅ Connected");

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    // Promote existing user to admin
    existing.role = "admin";
    await existing.save();
  } else {
    // Create new admin — pre-save hook auto-hashes the password
    await User.create({
      fullName: ADMIN_FULLNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
  }

  await mongoose.disconnect();
  console.log("🔌 Disconnected. Done.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
