const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

cartSchema.virtual("productObject", {
    ref: "Product",
    localField: "productId",
    foreignField: "_id",
    justOne: true
})

cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Cart", cartSchema)
