import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import { generateUniqueSlug } from "@/lib/slug";
import { getServerUser } from "@/lib/auth";

// GET /api/products — public with filters + pagination
export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "12"));
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const maxPrice = searchParams.get("maxPrice");

    const query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };
    if (featured === "true") query.isFeatured = true;
    if (maxPrice) query.price = { $lte: Number(maxPrice) };

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(query),
    ]);

    const response = NextResponse.json({
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
    // Cache for 30 s at CDN; serve stale for up to 5 min while revalidating
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=300"
    );
    return response;
  } catch (err) {
    console.error("[GET /products]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/products — admin only
export async function POST(request) {
  try {
    const user = await getServerUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    await dbConnect();
    const body = await request.json();
    if (body.name) {
      body.slug = await generateUniqueSlug(Product, body.name);
    }
    const product = await Product.create(body);
    // Invalidate user-facing pages so new product appears immediately
    revalidatePath("/products");
    revalidatePath("/");
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    console.error("[POST /products]", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
};
