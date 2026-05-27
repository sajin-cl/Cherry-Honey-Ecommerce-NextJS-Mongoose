import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/models/contact.model";
import nodemailer from "nodemailer";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    // Rate limit: 5 contact messages per IP per hour
    const ip = getClientIp(request);
    const { limited, retryAfter } = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
    if (limited) {
      return NextResponse.json(
        { error: `Too many messages sent. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Simple validation
    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect database
    await dbConnect();

    // Save to Database
    const newContact = await Contact.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Send Email to Admin (if SMTP is configured)
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

        const adminMailOptions = {
          from: process.env.EMAIL_FROM || `"Cherry Honey Admin" <noreply@example.com>`,
          to: process.env.SMTP_USER,
          replyTo: email,
          subject: `New Contact Submission: ${subject}`,
          html: `
            <div style="font-family: 'Georgia', serif; background-color: #000; color: #fff; padding: 30px; border-radius: 12px; border: 1px solid #C8A84B; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #C8A84B; text-align: center; border-bottom: 1px solid #222; padding-bottom: 15px; margin-top: 0;">Cherry Honey Store Inquiry</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #ccc;">You have received a new contact inquiry from the Cherry Honey website contact form. Here are the details:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #C8A84B; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #fff;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #C8A84B;">Email:</td>
                  <td style="padding: 8px 0; color: #fff;"><a href="mailto:${email}" style="color: #C8A84B; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #C8A84B;">Phone:</td>
                  <td style="padding: 8px 0; color: #fff;"><a href="tel:${phone}" style="color: #C8A84B; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #C8A84B;">Subject:</td>
                  <td style="padding: 8px 0; color: #fff;">${subject}</td>
                </tr>
              </table>
              
              <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #222;">
                <p style="font-weight: bold; color: #C8A84B; margin-bottom: 10px;">Message:</p>
                <div style="background-color: #0b0b0b; padding: 15px; border-radius: 8px; border: 1px solid #111; color: #eee; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
              
            </div>
          `,
        };

        await transporter.sendMail(adminMailOptions);
        emailSent = true;
      } catch (mailErr) {
        console.error("Nodemailer failed to send email via SMTP:", mailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message submitted successfully!",
      contactId: newContact._id,
      emailSent,
    });
  } catch (err) {
    console.error("[CONTACT_API_ERROR]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
