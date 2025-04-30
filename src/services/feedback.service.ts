import User from "../models/user.model";
import Feedback from "../models/feedback.model";

// Submit feedback (emoji) to a target (user or product)
export const submitFeedback = async (
  userId: string,
  emoji: string,
  targetId: string,
  targetType: "user" | "product"
) => {
  try {
    // Validate the user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Create a new feedback document
    const feedback = new Feedback({
      user: userId, // Reference to the user giving feedback
      emoji,
      target: targetId, // Reference to the target of feedback
      targetType,
    });

    // Save feedback to the database
    await feedback.save();

    console.log("Feedback submitted successfully");
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw new Error("Error submitting feedback");
  }
};

// Fetch feedback for a specific target
export const getFeedbackForTarget = async (
  targetId: string,
  targetType: "user" | "product",
  emoji?: string,
  userId?: string
) => {
  try {
    const filter: any = {
      target: targetId,
      targetType,
    };

    if (emoji) filter.emoji = emoji;
    if (userId) filter.user = userId;

    const feedbacks = await Feedback.find(filter).populate(
      "user",
      "name email"
    );

    return feedbacks;
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    throw new Error("Error retrieving feedback");
  }
};
