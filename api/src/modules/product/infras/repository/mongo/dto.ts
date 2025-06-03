import { EModelStatus } from "@prisma/client";
import mongoose, { Document, Schema, UpdateQuery } from "mongoose";
import slugify from "slugify";

export const modelName = "Product";

export function init() {
    const productSchema = new Schema(
        {
            id: {
                type: String,
                unique: true,
                require: true,
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
            brandId: {
                type: String,
                ref: "Brand",
            },
            categoryId: {
                type: String,
                ref: "Category",
            },
            status: {
                type: String,
                enum: EModelStatus,
                default: EModelStatus.ACTIVE,
            },
        },
        { timestamps: true }
    );

    // productSchema.pre("save", function (next) {
    //   this.slug = slugify(this.name, { lower: true });
    //   next();
    // });

    // productSchema.pre("updateOne", function (next) {
    //   const update = this.getUpdate() as UpdateQuery<Document>;;

    //   if (update && update.name) {
    //     update.slug = slugify(update.name, { lower: true });
    //     this.setUpdate(update);
    //   }
    //   next();
    // });

    // productSchema.set("toJSON", { virtuals: true });
    // productSchema.set("toObject", { virtuals: true });
    mongoose.model(modelName, productSchema);
}
