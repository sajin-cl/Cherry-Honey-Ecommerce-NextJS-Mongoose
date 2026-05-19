import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import { getServerUser } from "@/lib/auth";

// GET /api/orders/[id]
export async function GET(_, { params }) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const resolvedParams = await params;
    await dbConnect();
    const order = await Order.findById(resolvedParams.id)
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

// PATCH /api/orders/[id] — admin updates status or user cancels own order
export async function PATCH(request, { params }) {
  try {
    const user = await getServerUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const resolvedParams = await params;
    await dbConnect();
    const { orderStatus, paymentStatus } = await request.json();
    
    const existingOrder = await Order.findById(resolvedParams.id);
    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const isAdmin = user.role === "admin";
    const isOwner = existingOrder.user.toString() === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const update = {};

    if (isAdmin) {
      if (orderStatus) update.orderStatus = orderStatus;
      if (paymentStatus) update.paymentStatus = paymentStatus;
      if (orderStatus === "delivered") update.deliveredAt = new Date();
    } else {
      // Normal user can only cancel their own order and only if it is not shipped/delivered/cancelled yet
      if (orderStatus === "cancelled") {
        if (["shipped", "delivered", "cancelled"].includes(existingOrder.orderStatus)) {
          return NextResponse.json({ error: "Cannot cancel order at this stage" }, { status: 400 });
        }
        update.orderStatus = "cancelled";
      } else {
        return NextResponse.json({ error: "Invalid action for user" }, { status: 400 });
      }
    }

    // Return product stock when order is cancelled
    if (update.orderStatus === "cancelled" && existingOrder.orderStatus !== "cancelled") {
      if (existingOrder.items && Array.isArray(existingOrder.items)) {
        for (const item of existingOrder.items) {
          if (item.product) {
            await Product.findByIdAndUpdate(item.product, {
              $inc: { stock: Number(item.qty || 1) }
            });
          }
        }
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(resolvedParams.id, update, { new: true })
      .populate("user", "fullName email mobile")
      .lean();

    return NextResponse.json({ order: updatedOrder });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
