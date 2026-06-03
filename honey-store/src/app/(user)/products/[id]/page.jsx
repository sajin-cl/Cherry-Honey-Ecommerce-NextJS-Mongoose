/**
 * Server Component — product data is fetched directly from MongoDB here.
 * No client-side fetch waterfall. No loading spinner.
 * Interactive parts are delegated to ProductDetailClient.
 */
import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import ProductDetailClient from "@/components/products/ProductDetailClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    await dbConnect();
    const product = await Product.findById(id)
      .select("name description image")
      .lean();
    if (!product) return { title: "Product Not Found | Cherrys Honey" };
    return {
      title: `${product.name} | Cherrys Honey`,
      description:
        product.description?.slice(0, 160) ||
        "Buy pure natural honey from Cherrys Honey",
      openGraph: {
        images: product.image?.url ? [{ url: product.image.url }] : [],
      },
    };
  } catch {
    return { title: "Product | Cherrys Honey" };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  await dbConnect();

  const product = await Product.findById(id).lean();
  if (!product) notFound();

  const similar = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .lean();

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
      similarProducts={JSON.parse(JSON.stringify(similar))}
    />
  );
}
