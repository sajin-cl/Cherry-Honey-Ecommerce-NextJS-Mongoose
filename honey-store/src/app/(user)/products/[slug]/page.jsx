/**
 * Server Component — product data is fetched directly from MongoDB here.
 * No client-side fetch waterfall. No loading spinner.
 * Interactive parts are delegated to ProductDetailClient.
 */
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    await dbConnect();
    const query = mongoose.Types.ObjectId.isValid(slug)
      ? { $or: [{ slug }, { _id: slug }] }
      : { slug };
    const product = await Product.findOne(query)
      .select("name description image")
      .lean();
    if (!product) return { title: "Product Not Found | Cherrys Honey" };

    const title = `${product.name} | Cherrys Honey`;
    const description = product.description?.slice(0, 160) || "Buy pure natural honey from Cherrys Honey";
    const imageUrl = product.image?.url || "";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return { title: "Product | Cherrys Honey" };
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  await dbConnect();

  const query = mongoose.Types.ObjectId.isValid(slug)
    ? { $or: [{ slug }, { _id: slug }] }
    : { slug };

  const product = await Product.findOne(query).lean();
  if (!product) notFound();

  // Redirect to slug if URL was ID-based but product has a slug
  if (mongoose.Types.ObjectId.isValid(slug) && product.slug && product.slug !== slug) {
    redirect(`/products/${product.slug}`);
  }

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
