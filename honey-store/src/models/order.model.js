import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      name: String,
      line1: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
    paymentMethod: {
      type: String,
      enum: ["cashfree", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    // Cashfree fields
    cashfreeOrderId: { type: String },
    cashfreePaymentSessionId: { type: String },
    cashfreeReferenceId: { type: String },

    orderStatus: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
    },
    itemsTotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCharge: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
