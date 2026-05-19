import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const addressSchema = new mongoose.Schema({
    tag: {
        type: String,
        default: "HOME"
    },
    name: {
        type: String,
        required: true
    },
    line1: {
        type: String,
        required: true
    },
    city: String,
    state: String,
    pincode: String,
    phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Please enter valid mobile number"]
    },
    isDefault: {
        type: Boolean,
        default: false
    },
});

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    }
});

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        mobile: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        addresses: [addressSchema],
        cart: [cartItemSchema],
        resetPasswordToken: {
            type: String,
            select: false
        },
        resetPasswordExpire: {
            type: Date,
            select: false
        },
    },
    { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
});

// Compare password helper
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
