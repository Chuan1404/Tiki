const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PAYMENT_METHOD, SHIPPING_METHOD } = require("../contants");

const orderSchema = new Schema(
  {
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentMethod: {
      type: Number,
      default: PAYMENT_METHOD.CASH,
    },
    shippingMethod: {
        type: Number,
        default: SHIPPING_METHOD.STANDARD,
      },
    address: String,
    province: String,
    district: String,
    note: String,
  },
  { timestamps: true }
);

// cartSchema.virtual("productObject", {
//   ref: "Product",
//   localField: "productId",
//   foreignField: "_id",
//   justOne: true,
// });

// cartSchema.set("toJSON", { virtuals: true });
// cartSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);
