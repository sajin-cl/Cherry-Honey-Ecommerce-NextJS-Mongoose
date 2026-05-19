import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { getServerUser } from "@/lib/auth";

export async function GET() {
  try {
    const payload = await getServerUser();
    if (!payload) return NextResponse.json({ user: null }, { status: 401 });

    await dbConnect();
    const user = await User.findById(payload.id).lean();
    if (!user) return NextResponse.json({ user: null }, { status: 401 });

    return NextResponse.json({
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("[ME]", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
