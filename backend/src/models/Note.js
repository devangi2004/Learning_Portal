import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["pdf", "docx", "txt"], required: true },
    rawText: { type: String, required: true },
    bulletSummary: { type: [String], default: [] },
    paragraphSummary: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
