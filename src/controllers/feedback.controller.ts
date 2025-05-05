import { Request, Response } from "express";
import * as feedbackService from "../services/feedback.service";

// Submit feedback route
export const submitFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, emoji, targetId, targetType } = req.body;

  if (!userId || !emoji || !targetId || !targetType) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    // Call the feedback service to submit feedback
    await feedbackService.submitFeedback(userId, emoji, targetId, targetType);
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Get feedback for a specific target
export const getFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { targetId, targetType, emoji, userId } = req.query;

  if (!targetId || !targetType) {
    res.status(400).json({ message: "Missing required query parameters" });
    return;
  }

  try {
    const feedbacks = await feedbackService.getFeedbackForTarget(
      targetId as string,
      targetType as "user" | "product",
      emoji as string | undefined,
      userId as string | undefined
    );
    res.status(200).json({ feedbacks });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
