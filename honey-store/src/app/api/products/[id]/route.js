import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import { getServerUser } from "@/lib/auth";

async function isAdmin() {
  const user = await getServerUser();
  return user?.role === "admin";
}

// GET /api/products/[id]
export async function GET(_, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const product = await Product.findById(id).lean();
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    const similar = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
    .limit(3)
    .lean();

    return NextResponse.json({ product, similar });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/products/[id] — admin
export async function PUT(request, { params }) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    // Invalidate user-facing pages so they show updated data immediately
    revalidatePath("/products");
    revalidatePath("/");
    revalidatePath(`/products/${id}`);
    return NextResponse.json({ product });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

// DELETE /api/products/[id] — admin
export async function DELETE(_, { params }) {
  try {
    if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    await dbConnect();
    const { id } = await params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    // Invalidate user-facing pages so deleted product disappears immediately
    revalidatePath("/products");
    revalidatePath("/");
    revalidatePath(`/products/${id}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
