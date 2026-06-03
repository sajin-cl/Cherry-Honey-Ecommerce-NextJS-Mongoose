import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import Product from "@/models/product.model";
import { getServerUser } from "@/lib/auth";
import PaymentClient from "./PaymentClient";

export const metadata = { title: "Payment Method | Cherrys Honey" };

export default async function PaymentPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const isBuyNow = resolvedParams?.buyNow === "true";

  const userPayload = await getServerUser();
  if (!userPayload) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4 font-light">Please login to view payment options.</p>
          <Link
            href={`/accounts/login?redirect=/checkout/payment${isBuyNow ? '?buyNow=true' : ''}`}
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

  // For buyNow mode, subtotal is handled client-side from sessionStorage
  let cartSubtotal = 0;

  if (!isBuyNow) {
    // Calculate real subtotal of cart items
    const dbCart = user?.cart || [];

    dbCart.forEach((item) => {
      const prod = item?.product;
      if (!prod) return;
      const prodQtyNormalized = prod?.quantity ? prod.quantity.trim() : "500g";

      const getMultiplier = (selected, base) => {
        const s = String(selected)?.toLowerCase()?.trim();
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
      const itemPrice = (prod.discountPrice ?? prod.price) * multiplier;
      cartSubtotal += itemPrice * item.qty;
    });
  }

  return <PaymentClient cartSubtotal={cartSubtotal} isBuyNow={isBuyNow} />;
}