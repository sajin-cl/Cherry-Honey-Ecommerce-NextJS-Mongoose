import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import Product from "@/models/product.model";
import { getServerUser } from "@/lib/auth";

// GET /api/cart
export async function GET() {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(userPayload.id)
      .populate("cart.product")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ cart: user.cart || [] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/cart
export async function POST(request) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { productId, weight, qty } = await request.json();

    if (!productId || !weight || !qty) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const user = await User.findById(userPayload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if item already exists in cart with same weight
    const existingIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId && item.weight === weight
    );

    if (existingIndex > -1) {
      user.cart[existingIndex].qty += Number(qty);
    } else {
      user.cart.push({ product: productId, weight, qty: Number(qty) });
    }

    await user.save();
    
    const updatedUser = await User.findById(userPayload.id).populate("cart.product").lean();

    return NextResponse.json({ success: true, cart: updatedUser.cart });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/cart
export async function PUT(request) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { cartItemId, qty } = await request.json();

    if (!cartItemId || qty === undefined) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const user = await User.findById(userPayload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const item = user.cart.id(cartItemId);
    if (!item) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    item.qty = Number(qty);
    await user.save();

    const updatedUser = await User.findById(userPayload.id).populate("cart.product").lean();
    return NextResponse.json({ success: true, cart: updatedUser.cart });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/cart
export async function DELETE(request) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { cartItemIds } = await request.json();

    if (!cartItemIds || !Array.isArray(cartItemIds)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const user = await User.findById(userPayload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.cart = user.cart.filter((item) => !cartItemIds.includes(item._id.toString()));
    await user.save();

    const updatedUser = await User.findById(userPayload.id).populate("cart.product").lean();
    return NextResponse.json({ success: true, cart: updatedUser.cart });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
