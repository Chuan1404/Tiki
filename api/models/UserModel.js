const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
      name: {
        type: String,
      },
      password: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      role: {
        type: String,
        default: 'user'
      }
    },
    { timestamps: true }
  );

module.exports = new mongoose.model("User", userSchema)