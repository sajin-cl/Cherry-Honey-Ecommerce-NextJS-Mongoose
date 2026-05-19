import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

export async function POST(request) {
  try {
    await dbConnect();
    const { fullName, email, mobile, password } = await request.json();

    if (!fullName || !email || !password || !mobile) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const user = await User.create({ fullName: fullName.trim(), email: email.toLowerCase().trim(), mobile: mobile.trim(), password });

    const response = NextResponse.json(
      {
        success: true,
        user: { id: user._id, fullName: user.fullName, email: user.email, mobile: user.mobile, role: user.role }
      },
      { status: 201 }
    );

    return response;
  } catch (err) {
    console.error("[REGISTER]", err);
    if (err.code === 11000) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
