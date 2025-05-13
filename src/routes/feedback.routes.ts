import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller";
import { rateLimiter } from "../utils/rateLimiter";

const router = Router();

router.use(rateLimiter);

router.post("/feedback", feedbackController.submitFeedback);

router.get("/feedback", feedbackController.getFeedback);

export default router;
