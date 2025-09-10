import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    value: { type: Number, default: 0 },
    stage: {
      type: String,
      enum: ["Discovery", "Proposal", "Won", "Lost"],
      default: "Discovery",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Opportunity", opportunitySchema);
