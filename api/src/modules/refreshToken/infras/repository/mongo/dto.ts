import { EModelStatus } from "@shared/model/enums";
import mongoose, { Schema } from "mongoose";

export const modelName = "RefreshToken";

export function init() {
  const refreshTokenSchema = new Schema(
    {
      id: {
        type: String,
        unique: true,
        require: true,
      },
      token: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus .ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model(modelName, refreshTokenSchema);
}
