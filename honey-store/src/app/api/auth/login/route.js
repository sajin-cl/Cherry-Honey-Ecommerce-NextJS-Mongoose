import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { signToken } from "@/lib/jwt";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    // Rate limit: max 10 login attempts per IP per 15 minutes
    const ip = getClientIp(request);
    const { limited, retryAfter } = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
    if (limited) {
      return NextResponse.json(
        { error: `Too many login attempts. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[LOGIN]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
