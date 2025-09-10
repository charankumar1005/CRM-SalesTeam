// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String,
         enum: ["rep", "manager", "admin"],
        default: "rep" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
