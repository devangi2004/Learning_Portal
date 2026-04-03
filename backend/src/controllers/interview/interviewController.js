import PracticeResult from "../../models/PracticeResult.js";
import { promptGemini } from "../../services/geminiService.js";

export const evaluateInterviewAnswer = async (req, res, next) => {
  try {
    const { question, transcript } = req.body;

    if (!question || !transcript) {
      return res.status(400).json({ message: "Question and transcript are required" });
    }

    const raw = await promptGemini(`
Evaluate this interview response.
Question: ${question}
Answer: ${transcript}
Return strict JSON with: clarityScore, confidenceScore, relevanceScore, totalScore, feedback, suggestions (array).
`);

    const feedback = JSON.parse(raw.replace(/```json|```/g, "").trim());

    await PracticeResult.create({
      userId: req.user.userId,
      module: "interview",
      score: feedback.totalScore || 0,
      metadata: { question, transcript, feedback },
    });

    res.json(feedback);
  } catch (error) {
    next(error);
  }
};
