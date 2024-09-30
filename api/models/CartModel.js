const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {timestamps: true})


module.exports = mongoose.model("Cart", cartSchema)
