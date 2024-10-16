import mongoose, { Schema } from "mongoose";

export const modelName = "Cart";

export function init() {
  const cartSchema = new Schema(
    {
      id: {
        type: String,
        unique: true,
        require: true,
      },
      productId: {
        type: String,
        ref: "Product",
        required: true,
      },
      userId: {
        type: String,
        ref: "User",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
    { timestamps: true }
  );

  cartSchema.virtual("productObject", {
    ref: "Product",
    localField: "productId",
    foreignField: "id",
    justOne: true,
  });

  cartSchema.set("toJSON", { virtuals: true });
  cartSchema.set("toObject", { virtuals: true });

  mongoose.model(modelName, cartSchema);
}
