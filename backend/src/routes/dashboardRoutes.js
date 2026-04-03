import { Router } from "express";
import { authGuard } from "../middleware/authMiddleware.js";
import { addXp, getDashboard } from "../controllers/dashboard/dashboardController.js";

const router = Router();
router.use(authGuard);
router.get("/", getDashboard);
router.post("/xp", addXp);

export default router;
