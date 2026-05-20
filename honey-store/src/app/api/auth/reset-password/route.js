// POST /api/auth/reset-password
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

export async function POST(request) {
  try {
    await dbConnect();

    const { token, password } = await request.json();
    if (!token || !password) {
      return NextResponse.json({ error: "Token and new password required" }, { status: 400 });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: new Date() },
    }).select("+password +resetPasswordToken +resetPasswordExpire");

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    user.password = password; // pre‑save hook will hash it
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return NextResponse.json({ message: "Password successfully reset" });
  } catch (err) {
    console.error("[RESET_PASSWORD]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
