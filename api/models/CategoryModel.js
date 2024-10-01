const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new Schema({
    _id: Number,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
}, {timestamps: true})

categorySchema.plugin(AutoIncrement, { id: 'category_counter', inc_field: '_id' });
module.exports = mongoose.model("Category", categorySchema)
