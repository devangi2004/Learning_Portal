import mongoose from "mongoose";

const practiceResultSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    module: { type: String, enum: ["coding", "interview", "quiz"], required: true },
    score: { type: Number, required: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true },
);

export default mongoose.model("PracticeResult", practiceResultSchema);
