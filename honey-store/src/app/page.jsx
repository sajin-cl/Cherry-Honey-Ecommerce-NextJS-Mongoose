import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import HomeClient from "./HomeClient";
import Navbar from "@/components/layouts/(user)/Navbar";
import Footer from "@/components/layouts/(user)/Footer";


export const metadata = {
  title: "Cherry Honey | Premium Raw Organic Honey Store",
  description: "Experience 100% natural, raw, and ethically harvested honey straight from organic bee farms. Shop premium white wildflower honey today.",
};

export default async function HomePage() {
  await dbConnect();

  // Fetch featured products directly from database on the server
  const products = await Product.find({ isFeatured: true }).lean();

  // Safe BSON-to-plain-object serialization for Next.js Server Components
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <>
    <Navbar />
    <HomeClient featuredProducts={serializedProducts} />
    <Footer />
  </>;
}