// POST /api/auth/forgot-password
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(request) {
  try {
    await dbConnect();

    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

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
    let emailSent = false;

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

        const mailOptions = {
          from: process.env.EMAIL_FROM || '"Honey Store" <noreply@example.com>',
          to: user.email,
          subject: "Password Reset Request",
          html: `<p>Hello ${user.fullName || ""},</p>
                 <p>You requested a password reset. Click the link below (valid for 1 hour):</p>
                 <p><a href="${resetUrl}">${resetUrl}</a></p>
                 <p>If you didn’t request this, you can ignore this email.</p>`,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (mailErr) {
        console.error("Nodemailer failed to send email via SMTP:", mailErr.message);
      }
    }

    if (!emailSent) {
      console.log("\n==================================================");
      console.log("PASSWORD RESET URL (DEVELOPMENT CONSOLE):");
      console.log(resetUrl);
      console.log("==================================================\n");
    }

    return NextResponse.json({
      message: "If that email exists, a reset link will be sent.",
      resetUrl: process.env.NODE_ENV !== "production" ? resetUrl : undefined
    });
  } catch (err) {
    console.error("[FORGOT_PASSWORD]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
