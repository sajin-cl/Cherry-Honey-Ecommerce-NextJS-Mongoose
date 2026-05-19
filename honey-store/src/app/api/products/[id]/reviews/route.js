import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import User from "@/models/user.model";
import { getServerUser } from "@/lib/auth";

export async function POST(request, { params }) {
  try {
    const userPayload = await getServerUser();
    if (!userPayload) {
      return NextResponse.json({ error: "Please login to write a review" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const { rating, comment } = await request.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }
    if (!comment || !comment.trim()) {
      return NextResponse.json({ error: "Comment is required" }, { status: 400 });
    }

    // Get user details
    const dbUser = await User.findById(userPayload.id).lean();
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === userPayload.id
    );

    if (alreadyReviewed) {
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment.trim();
    } else {
      const review = {
        user: userPayload.id,
        name: dbUser.fullName || dbUser.name || "Anonymous",
        rating: Number(rating),
        comment: comment.trim(),
      };
      product.reviews.push(review);
    }

    await product.save();

    return NextResponse.json({
      success: true,
      message: alreadyReviewed ? "Review updated" : "Review added",
      product,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
