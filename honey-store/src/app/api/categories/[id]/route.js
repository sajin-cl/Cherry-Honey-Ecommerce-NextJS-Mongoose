import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category.model";
import { getServerUser } from "@/lib/auth";

function makeSlug(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

async function isAdmin() {
  const user = await getServerUser();
  return user?.role === "admin";
}

// GET /api/categories/[id]
export async function GET(_, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const category = await Category.findById(id).lean();
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ category });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/categories/[id] — admin
export async function PUT(request, { params }) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    if (body.name) body.slug = makeSlug(body.name);
    const category = await Category.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ category });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

// DELETE /api/categories/[id] — admin
export async function DELETE(_, { params }) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    await dbConnect();
    const { id } = await params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
