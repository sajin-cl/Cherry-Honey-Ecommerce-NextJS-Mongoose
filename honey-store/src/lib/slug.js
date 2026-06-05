export function makeSlug(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/[^\w-]/g, ""); // remove non-word characters except hyphens
}

export async function generateUniqueSlug(Model, name, currentId = null) {
  const baseSlug = makeSlug(name) || "product";
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const query = { slug };
    if (currentId) {
      query._id = { $ne: currentId };
    }
    const exists = await Model.findOne(query).select("_id").lean();
    if (!exists) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}
