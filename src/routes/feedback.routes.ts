import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller";

const router = Router();

// Route to submit feedback (emoji) for a target (user/product)
router.post("/feedback", feedbackController.submitFeedback);

// Route to get feedback for a target (user/product)
router.get("/feedback", feedbackController.getFeedback);

export default router;
