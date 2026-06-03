import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import Product from "@/models/product.model";
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
    const body = await request.json();

    // ── Input validation ──────────────────────────────────────────────────────
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Order must contain at least one item" }, { status: 400 });
    }
    if (!body.paymentMethod || !["cashfree", "cod"].includes(body.paymentMethod)) {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }
    if (typeof body.grandTotal !== "number" || body.grandTotal <= 0) {
      return NextResponse.json({ error: "Invalid order total" }, { status: 400 });
    }
    if (!body.shippingAddress?.name || !body.shippingAddress?.line1 || !body.shippingAddress?.phone) {
      return NextResponse.json({ error: "Shipping address is incomplete" }, { status: 400 });
    }

    // ── Stock check — verify ALL items have sufficient stock BEFORE creating order ──
    // Uses a single parallel check so we fail early without touching the DB order collection
    const stockChecks = await Promise.all(
      body.items.map((item) =>
        Product.findOne(
          { _id: item.product, stock: { $gte: Number(item.qty || 1) } },
          { _id: 1, name: 1, stock: 1 }
        ).lean()
      )
    );

    for (let i = 0; i < stockChecks.length; i++) {
      if (!stockChecks[i]) {
        const itemName = body.items[i].name || `Item ${i + 1}`;
        return NextResponse.json(
          { error: `"${itemName}" is out of stock or has insufficient quantity.` },
          { status: 409 }
        );
      }
    }

    // ── Create the order ──────────────────────────────────────────────────────
    const order = await Order.create({ ...body, user: user.id });

    // ── Atomically decrement stock for each item ──────────────────────────────
    // Uses $inc with a $gte guard so stock can never go below 0 even under race conditions
    await Promise.all(
      body.items.map((item) =>
        Product.findOneAndUpdate(
          { _id: item.product, stock: { $gte: Number(item.qty || 1) } },
          { $inc: { stock: -Number(item.qty || 1) } }
        )
      )
    );

    // ── Clear user's cart in DB ───────────────────────────────────────────────
    await User.findByIdAndUpdate(user.id, { $set: { cart: [] } });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error("[POST /orders]", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
};
