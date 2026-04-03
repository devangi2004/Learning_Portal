import Note from "../../models/Note.js";
import { promptGemini } from "../../services/geminiService.js";

export const generateQuestions = async (req, res, next) => {
  try {
    const { noteId, type = "mixed", count = 5 } = req.body;
    const note = await Note.findOne({ _id: noteId, userId: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const prompt = `
Generate ${count} ${type} questions from this content.
Return JSON array where each item has: questionType, question, options(optional), correctAnswer, explanation.
Content:\n${note.rawText.slice(0, 12000)}
`;

    const raw = await promptGemini(prompt);
    const payload = JSON.parse(raw.replace(/```json|```/g, "").trim());

    res.json({ questions: payload });
  } catch (error) {
    next(error);
  }
};
