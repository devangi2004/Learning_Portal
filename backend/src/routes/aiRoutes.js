import { Router } from "express";
import { authGuard } from "../middleware/authMiddleware.js";
import { generateQuestions } from "../controllers/ai/questionController.js";

const router = Router();
router.use(authGuard);
router.post("/questions", generateQuestions);

export default router;
