import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        category: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        discountPrice: { type: Number, min: 0 },
        stock: { type: Number, required: true, default: 0, min: 0 },
        image: {
            url: { type: String, default: "" },
            publicId: { type: String, default: "" },
        },
        reviews: [reviewSchema],
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Auto-calculate rating on save
productSchema.pre("save", function (next) {
    if (this.reviews.length > 0) {
        this.numReviews = this.reviews.length;
        this.rating =
            this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
    }
    next();
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
