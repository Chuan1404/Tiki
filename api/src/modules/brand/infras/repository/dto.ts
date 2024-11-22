import { EModelStatus } from "../../../../share/model/enums";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export const modelName = "Brand";

export function init() {
  const brandSchema = new Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus.ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model(modelName, brandSchema);
}
