import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { getServerUser } from "@/lib/auth";

// GET /api/orders — user sees own orders, admin sees all
export async function GET(request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page  = Math.max(1, parseInt(searchParams.get("page")  || "1"));
    const limit = 10;

    const query = user.role === "admin" ? {} : { user: user.id };

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("user", "fullName email")
        .lean(),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      orders,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /orders]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/orders — logged-in user creates order
export async function POST(request) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body  = await request.json();
    const order = await Order.create({ ...body, user: user.id });

    // Clear user's cart in DB
    await User.findByIdAndUpdate(user.id, { $set: { cart: [] } });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error("[POST /orders]", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
