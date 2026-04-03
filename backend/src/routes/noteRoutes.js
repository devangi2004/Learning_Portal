import { Router } from "express";
import multer from "multer";
import { authGuard } from "../middleware/authMiddleware.js";
import { getNotes, summarizeNote, uploadNote } from "../controllers/notes/noteController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authGuard);
router.get("/", getNotes);
router.post("/upload", upload.single("note"), uploadNote);
router.post("/:noteId/summarize", summarizeNote);

export default router;
