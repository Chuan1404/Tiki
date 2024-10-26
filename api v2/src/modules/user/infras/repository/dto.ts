import mongoose, { Schema } from "mongoose";
import { ModelStatus } from "../../../../share/model/baseModel";
import { UserRole } from "../../model";

export const modelName = "User";

export function init() {
  const userSchema = new Schema(
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
        enum: UserRole,
        default: UserRole.USER
      },
      status: {
        type: String,
        enum: ModelStatus,
        default: ModelStatus.ACTIVE,
      },
    },
    { timestamps: true }
  );

  mongoose.model(modelName, userSchema);
}
