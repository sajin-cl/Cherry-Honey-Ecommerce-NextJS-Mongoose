import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category.model";
import { getServerUser } from "@/lib/auth";

function makeSlug(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

// GET /api/categories — public
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ name: 1 }).lean();
    return NextResponse.json({ categories });
  } catch (err) {
    console.error("[GET /categories]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/categories — admin only
export async function POST(request) {
  try {
    const user = await getServerUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const { name, description, image } = await request.json();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const category = await Category.create({
      name: name.trim(),
      slug: makeSlug(name),
      description,
      image,
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    console.error("[POST /categories]", err);
    if (err.code === 11000) {
      return NextResponse.json({ error: "Category already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
