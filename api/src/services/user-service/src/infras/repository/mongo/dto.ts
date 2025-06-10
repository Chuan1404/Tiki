import { EModelStatus, EUserRole } from "devchu-common";
import mongoose, { Schema } from "mongoose";

export const modelName = "User";

export function init() {
  const userSchema = new Schema(
    {
      id: {
        type: String,
        unique: true,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
      },
      role: {
        type: String,
        enum: EUserRole,
        default: EUserRole.USER
      },
      status: {
        type: String,
        enum: EModelStatus,
        default: EModelStatus.ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model(modelName, userSchema);
}
