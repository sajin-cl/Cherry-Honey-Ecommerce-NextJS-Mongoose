/**
 * SSR Products Page — data fetched from DB via searchParams.
 * Pagination and filters change the URL → triggers a server re-render.
 */
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product.model";
import Category from "@/models/category.model";
import ProductsClient from "@/components/products/ProductsPage";

export const metadata = { title: "Our Products | Cherrys Honey" };

const PER_PAGE = 12;

async function fetchProducts({ page, maxPrice, search, category, size }) {
  await dbConnect();
  const andClauses = [];

  if (category) {
    const catList = category.split(",");
    andClauses.push({ category: { $in: catList } });
  }

  if (search) {
    andClauses.push({ name: { $regex: search, $options: "i" } });
  }

  if (maxPrice) {
    const maxVal = Number(maxPrice);
    andClauses.push({
      $or: [
        { discountPrice: { $exists: true, $ne: null, $lte: maxVal } },
        {
          $and: [
            { $or: [{ discountPrice: { $exists: false } }, { discountPrice: null }] },
            { price: { $lte: maxVal } }
          ]
        }
      ]
    });
  }

  if (size) {
    const sizeList = size.split(",");
    const sizeOrs = [];
    sizeList.forEach((s) => {
      if (s === "s-250") {
        sizeOrs.push({ quantity: { $regex: "250", $options: "i" } });
      } else if (s === "s-500") {
        sizeOrs.push({ quantity: { $regex: "500", $options: "i" } });
      } else if (s === "s-1000") {
        sizeOrs.push({
          $or: [
            { quantity: { $regex: "1kg", $options: "i" } },
            { quantity: { $regex: "1000", $options: "i" } },
            { quantity: { $regex: "1\\s*kg", $options: "i" } }
          ]
        });
      }
    });
    if (sizeOrs.length > 0) {
      andClauses.push({ $or: sizeOrs });
    }
  }

  const query = andClauses.length > 0 ? { $and: andClauses } : {};

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PER_PAGE)
      .limit(PER_PAGE)
      .lean(),
    Product.countDocuments(query),
  ]);

  return { products, total, totalPages: Math.ceil(total / PER_PAGE) };
}

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = Math.max(1, parseInt(resolvedParams?.page || "1"));
  const maxPrice = resolvedParams?.maxPrice || "";
  const search = resolvedParams?.search || "";
  const category = resolvedParams?.category || "";
  const size = resolvedParams?.size || "";

  await dbConnect();
  const dbCats = await Category.find({}).lean();
  const categoriesList = dbCats.map((cat) => ({
    id: cat?.name,
    label: cat?.name,
    count: undefined
  }));

  const { products, total, totalPages } = await fetchProducts({ page, maxPrice, search, category, size });

  const from = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const to = Math.min(page * PER_PAGE, total);

  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <ProductsClient
      products={serializedProducts}
      total={total}
      totalPages={totalPages}
      page={page}
      from={from}
      to={to}
      categoriesList={categoriesList}
      resolvedParams={resolvedParams}
    />
  );
}
