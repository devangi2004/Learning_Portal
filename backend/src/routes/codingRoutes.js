import { Router } from "express";
import { authGuard } from "../middleware/authMiddleware.js";
import { generateCodingProblem } from "../controllers/coding/codingController.js";

const router = Router();
router.use(authGuard);
router.post("/problem", generateCodingProblem);

export default router;
