import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
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

// POST /api/cart — add item(s) to cart
// Uses atomic $inc / $push so concurrent requests can't overwrite each other
export async function POST(request) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    let itemsToProcess = [];
    if (Array.isArray(body)) {
      itemsToProcess = body;
    } else if (body && Array.isArray(body.items)) {
      itemsToProcess = body.items;
    } else {
      itemsToProcess = [body];
    }

    let processedAny = false;

    for (const item of itemsToProcess) {
      const pId =
        item.productId ||
        (item.product &&
          (typeof item.product === "object" ? item.product._id : item.product));
      const weight = item.weight;
      const qty = Number(item.qty);

      if (!pId || !weight || isNaN(qty) || qty <= 0) continue;

      processedAny = true;

      // Try to increment qty if this product+weight combination already exists
      const updated = await User.findOneAndUpdate(
        { _id: userPayload.id, "cart.product": pId, "cart.weight": weight },
        { $inc: { "cart.$.qty": qty } }
      );

      // If not found (item not yet in cart), push a new entry
      if (!updated) {
        await User.findByIdAndUpdate(userPayload.id, {
          $push: { cart: { product: pId, weight, qty } },
        });
      }
    }

    if (!processedAny && !Array.isArray(body) && !Array.isArray(body?.items)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Single read to return updated cart
    const updatedUser = await User.findById(userPayload.id)
      .populate("cart.product")
      .lean();

    return NextResponse.json({ success: true, cart: updatedUser.cart });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/cart — update qty of one cart item
// Atomic $set via positional operator — no read-modify-write
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

    const newQty = Number(qty);
    if (isNaN(newQty) || newQty < 1) {
      return NextResponse.json({ error: "Quantity must be at least 1" }, { status: 400 });
    }

    // Atomic update — no read step needed
    const updated = await User.findOneAndUpdate(
      { _id: userPayload.id, "cart._id": cartItemId },
      { $set: { "cart.$.qty": newQty } },
      { new: true }
    ).populate("cart.product").lean();

    if (!updated) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    return NextResponse.json({ success: true, cart: updated.cart });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/cart — remove one or more cart items
// Atomic $pull — no read-modify-write
export async function DELETE(request) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { cartItemIds } = await request.json();

    if (!cartItemIds || !Array.isArray(cartItemIds) || cartItemIds.length === 0) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Atomic $pull — removes matching items in a single DB operation
    const updated = await User.findByIdAndUpdate(
      userPayload.id,
      { $pull: { cart: { _id: { $in: cartItemIds } } } },
      { new: true }
    ).populate("cart.product").lean();

    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, cart: updated.cart });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
