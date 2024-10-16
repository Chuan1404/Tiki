import mongoose, { Schema } from "mongoose";
import { ModelStatus } from "../../../../share/model/baseModel";

export const modelName = "Product";

export function init() {
  const productSchema = new Schema({
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
    brandName: {
      type: String,
    },
    status: {
      type: String,
      enum: ModelStatus,
      default: ModelStatus.ACTIVE
    }
  }, {timestamps: true});

  mongoose.model(modelName, productSchema);
}
