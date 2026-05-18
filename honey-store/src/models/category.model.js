import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Category =  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
