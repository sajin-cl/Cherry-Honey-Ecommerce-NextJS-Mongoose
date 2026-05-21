import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import Product from "@/models/product.model";
import { getServerUser } from "@/lib/auth";
import ReviewClient from "./ReviewClient";

export const metadata = { title: "Review Order | Cherry Honey" };

export default async function ReviewPage() {
  const userPayload = await getServerUser();
  if (!userPayload) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4 font-light">Please login to review your order.</p>
          <Link
            href="/accounts/login?redirect=/checkout/review"
            className="bg-[#C8A84B] hover:bg-[#b8973e] px-8 py-3 text-black font-semibold text-sm tracking-[0.1em] uppercase transition-colors inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  await dbConnect();
  const user = await User.findById(userPayload.id)
    .populate("cart.product")
    .lean();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-400">User profile not found.</p>
      </div>
    );
  }

  const dbCart = user.cart || [];

  const initialItems = dbCart.map((item) => {
    const prod = item.product;
    const prodQtyNormalized = prod?.quantity ? prod.quantity.trim() : "500g";

    const getMultiplier = (selected, base) => {
      const s = String(selected).toLowerCase().trim();
      const b = String(base || "500g").toLowerCase().trim();
      if (s === b) return 1.0;

      const getVal = (str) => {
        const num = parseFloat(str);
        const isKg = str.includes("kg") || str.includes("kilogram");
        return isKg ? num * 1000 : num;
      };

      const sVal = getVal(s);
      const bVal = getVal(b);
      if (isNaN(sVal) || isNaN(bVal) || bVal === 0) return 1.0;

      const ratio = sVal / bVal;
      if (Math.abs(ratio - 2.0) < 0.1) return 1.8;
      if (Math.abs(ratio - 4.0) < 0.1) return 3.4;
      return ratio;
    };

    const multiplier = getMultiplier(item.weight, prodQtyNormalized);
    const itemPrice = prod ? (prod.discountPrice ?? prod.price) * multiplier : 0;
    const itemOriginal = prod ? prod.price * multiplier : 0;

    return {
      id: item._id.toString(),
      productId: prod?._id?.toString() || "",
      name: prod?.name || "Deleted Product",
      price: itemPrice,
      original: itemOriginal,
      image: prod?.image?.url || "/hero-honey-jar.webp",
      qty: item.qty,
      weight: item.weight
    };
  });

  return <ReviewClient initialItems={initialItems} />;
}
