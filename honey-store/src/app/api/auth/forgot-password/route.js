// POST /api/auth/forgot-password
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    // Rate limit per IP: 5 requests per 15 minutes
    const ip = getClientIp(request);
    const ipCheck = rateLimit(`forgot-ip:${ip}`, 5, 15 * 60 * 1000);
    if (ipCheck.limited) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${ipCheck.retryAfter} seconds.` },
        { status: 429, headers: { "Retry-After": String(ipCheck.retryAfter) } }
      );
    }

    // Rate limit per email: 3 requests per 15 minutes
    const emailKey = `forgot-email:${email.toLowerCase().trim()}`;
    const emailCheck = rateLimit(emailKey, 3, 15 * 60 * 1000);
    if (emailCheck.limited) {
      // Return generic message so we don't leak that this email exists
      return NextResponse.json(
        { message: "If that email exists, a reset link will be sent." },
        { status: 200 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return NextResponse.json({ message: "If that email exists, a reset link will be sent." }, { status: 200 });

    // generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expire = Date.now() + 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpire = new Date(expire);
    await user.save();

    // send email
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/accounts/reset-password?token=${token}`;

    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_FROM || '"Cherrys Honey" <support@cherryshoney.com>',
          to: user.email,
          subject: "Password Reset Request",
          html: `<p>Hello ${user.fullName || ""},</p>
                 <p>You requested a password reset. Click the link below (valid for 1 hour):</p>
                 <p><a href="${resetUrl}">${resetUrl}</a></p>
                 <p>If you didn't request this, you can ignore this email.</p>`,
        });
      } catch (mailErr) {
        console.error("Nodemailer failed:", mailErr.message);
      }
    }

    return NextResponse.json({
      message: "If that email exists, a reset link will be sent.",
      resetUrl: process.env.NODE_ENV !== "production" ? resetUrl : undefined,
    });
  } catch (err) {
    console.error("[FORGOT_PASSWORD]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
