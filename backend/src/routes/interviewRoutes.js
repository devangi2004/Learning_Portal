import { Router } from "express";
import { authGuard } from "../middleware/authMiddleware.js";
import { evaluateInterviewAnswer } from "../controllers/interview/interviewController.js";

const router = Router();
router.use(authGuard);
router.post("/evaluate", evaluateInterviewAnswer);

export default router;
