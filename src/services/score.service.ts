import User from "../models/user.model";

// Validate score update and apply changes
export const validateAndUpdateScore = async (
  userId: string,
  newScore: number
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const currentScore = user.stats.totalScore || 0;
    const maxScoreIncrease = 10;

    if (newScore - currentScore > maxScoreIncrease) {
      // Optionally flag suspicious activity
      user.flags = user.flags || [];
      user.flags.push({
        type: "score manipulation",
        reason: `Attempted to increase score from ${currentScore} to ${newScore}`,
        timestamp: new Date(),
      });

      await user.save(); // Save the flag
      throw new Error("Invalid score increase. Anti-cheat triggered.");
    }

    user.stats.totalScore = newScore;
    await user.save();

    console.log(` Score updated for user ${userId}`);
  } catch (error) {
    console.error(" Error updating score:", error);
    throw error;
  }
};
