import { EModelStatus } from "devchu-common";
import mongoose, { Schema } from "mongoose";

export const modelName = "Token";

export function init() {
    const tokenSchema = new Schema(
        {
            token: {
                type: String,
                unique: true,
                required: true,
            },
            userId: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: EModelStatus,
                default: EModelStatus.ACTIVE,
            },
        },
        { timestamps: true }
    );

    mongoose.model(modelName, tokenSchema);
}
