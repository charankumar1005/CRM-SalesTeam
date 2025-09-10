import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String },
     value: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified"],
      default: "New",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
