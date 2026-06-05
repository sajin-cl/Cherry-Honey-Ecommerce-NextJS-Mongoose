import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import HomeClient from "./HomeClient";

export const metadata = {
  title: "Cherrys Honey | Premium Raw Organic Honey Store",
  description: "Experience 100% natural, raw, and ethically harvested honey straight from organic bee farms. Shop premium white wildflower honey today.",
};

export default async function LandingPage() {
  await dbConnect();
  const products = await Product.find({ isFeatured: true }).lean();
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <HomeClient featuredProducts={serializedProducts} />;
}
