import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import { getServerUser } from "@/lib/auth";

// GET /api/admin/stats — admin dashboard numbers
export async function GET() {
  try {
    const user = await getServerUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await dbConnect();

    const [totalUsers, totalProducts, totalOrders, revenueData] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$grandTotal" } } },
      ]),
    ]);

    const revenue = revenueData[0]?.total ?? 0;

    return NextResponse.json({ totalUsers, totalProducts, totalOrders, revenue });
  } catch (err) {
    console.error("[GET /admin/stats]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
