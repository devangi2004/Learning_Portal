import { promptGemini } from "../../services/geminiService.js";

export const generateCodingProblem = async (req, res, next) => {
  try {
    const { topic = "DSA", difficulty = "easy" } = req.body;

    const raw = await promptGemini(`
Create one ${difficulty} coding interview problem about ${topic}.
Return strict JSON with keys: title, problem, inputOutput, constraints, solution, explanation.
`);

    const problem = JSON.parse(raw.replace(/```json|```/g, "").trim());
    res.json(problem);
  } catch (error) {
    next(error);
  }
};
