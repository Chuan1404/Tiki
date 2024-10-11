const mongoose = require("mongoose")
const Schema = mongoose.Schema

const slugify = require('slugify');

const productSchema = new Schema({
    categoryId: {
        type: Number,
        ref: "Category"
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnailUrl: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    brandName: {
        type: String,
    },
    ratingAverage: {
        type: Number,
    },
    reviewCount: {
        type: Number,
    },
}, {timestamps: true})

productSchema.virtual("categoryObject", {
    ref: "Category",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
})

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

productSchema.pre('updateOne', function (next) {
    const update = this.getUpdate();

    if (update.name) {
        update.slug = slugify(update.name, { lower: true });
        this.setUpdate(update);  // Set the updated query with the slug
    }
    next();
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("Product", productSchema)
