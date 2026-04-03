import Note from "../../models/Note.js";
import { extractText } from "../../services/fileExtractionService.js";
import { promptGemini } from "../../services/geminiService.js";

export const uploadNote = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { type, text } = await extractText(req.file);
    const note = await Note.create({
      userId: req.user.userId,
      title: req.body.title || req.file.originalname,
      type,
      rawText: text,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const summarizeNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.noteId, userId: req.user.userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const summary = await promptGemini(`
Given the notes below, produce JSON with keys bulletSummary (array of strings) and paragraphSummary (string).
Notes:\n${note.rawText.slice(0, 12000)}
`);

    let parsed;
    try {
      parsed = JSON.parse(summary.replace(/```json|```/g, "").trim());
    } catch {
      parsed = { bulletSummary: ["Summary generation fallback."], paragraphSummary: summary };
    }

    note.bulletSummary = parsed.bulletSummary || [];
    note.paragraphSummary = parsed.paragraphSummary || "";
    await note.save();

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};
