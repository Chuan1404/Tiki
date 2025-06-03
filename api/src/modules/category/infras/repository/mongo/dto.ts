import { EModelStatus } from "@prisma/client";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

export function init() {
    const categorySchema = new Schema(
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

    mongoose.model("Category", categorySchema);
}
