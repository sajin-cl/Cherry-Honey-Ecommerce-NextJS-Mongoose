/**
 * SSR — data fetched directly from DB on the server.
 * Interactive parts (add/edit/delete) are isolated in CategoriesClient.
 */
import { requireAdmin } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category.model";
import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "Categories | Admin",
};

export default async function CategoriesPage() {
  await requireAdmin(); // redirects if not admin
  await dbConnect();

  const raw = await Category.find().sort({ name: 1 }).lean();
  // Serialize _id (ObjectId → string) for client component
  const categories = raw.map((c) => ({
    id: c._id.toString(),
    name: c.name,
    slug: c.slug,
    description: c.description ?? "",
    image: c.image ?? {},
    createdAt: c.createdAt?.toISOString(),
  }));

  return <CategoriesClient initialCategories={categories} />;
}
