import { Router } from "express";
import * as feedbackController from "../controllers/feedback.controller";

const router = Router();

router.post("/feedback", feedbackController.submitFeedback);

router.get("/feedback", feedbackController.getFeedback);

export default router;
