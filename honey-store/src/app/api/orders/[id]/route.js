import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import { getServerUser } from "@/lib/auth";

// GET /api/orders/[id]
export async function GET(_, { params }) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const order = await Order.findById(params.id)
      .populate("user", "fullName email")
      .lean();
    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Users can only see their own orders
    if (user.role !== "admin" && order.user._id.toString() !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH /api/orders/[id] — admin updates status
export async function PATCH(request, { params }) {
  try {
    const user = await getServerUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();
    const { orderStatus, paymentStatus } = await request.json();
    const update = {};
    if (orderStatus) update.orderStatus = orderStatus;
    if (paymentStatus) update.paymentStatus = paymentStatus;
    if (orderStatus === "delivered") update.deliveredAt = new Date();

    const order = await Order.findByIdAndUpdate(params.id, update, { new: true }).lean();
    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
