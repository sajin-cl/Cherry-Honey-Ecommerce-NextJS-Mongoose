import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { getServerUser } from "@/lib/auth";

export async function POST(request) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { name, line1, phone, tag } = await request.json();

    if (!name || !line1 || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await User.findById(userPayload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newAddress = {
      name,
      line1,
      phone,
      tag: tag || "HOME",
      isDefault: user.addresses.length === 0
    };

    user.addresses.push(newAddress);
    await user.save();

    return NextResponse.json({ success: true, addresses: user.addresses });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { addressId } = await request.json();

    if (!addressId) {
      return NextResponse.json({ error: "Missing address ID" }, { status: 400 });
    }

    const user = await User.findById(userPayload.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);
    await user.save();

    return NextResponse.json({ success: true, addresses: user.addresses });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
