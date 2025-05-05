import User from "../models/user.model";
import Leaderboard from "../models/Leaderboard.model";
import { handleError } from "../utils/errorHandler";

// Validate score update and apply changes
export const validateAndUpdateScore = async (
  userId: string,
  newScore: number,
  gameId: string
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const currentScore = user.stats.totalScore || 0;
    const maxScoreIncrease = 10;

    // Anti-cheat check
    if (newScore - currentScore > maxScoreIncrease) {
      user.flags = user.flags || [];
      user.flags.push({
        type: "score manipulation",
        reason: `Attempted to increase score from ${currentScore} to ${newScore}`,
        timestamp: new Date(),
      });

      await user.save();
      throw new Error("Invalid score increase. Anti-cheat triggered.");
    }

    // Achievement logic
    const newAchievements: string[] = [];

    if (currentScore < 100 && newScore >= 100) {
      newAchievements.push("Centurion");
    }

    if (currentScore < 500 && newScore >= 500) {
      newAchievements.push("Legend");
    }

    if (currentScore < 1000 && newScore >= 1000) {
      newAchievements.push("Elite");
    }

    // Merge and de-duplicate achievements
    user.stats.achievements = [
      ...new Set([...user.stats.achievements, ...newAchievements]),
    ];

    // Update score
    user.stats.totalScore = newScore;
    await user.save();

    // Upsert leaderboard entry
    await Leaderboard.findOneAndUpdate(
      { userId: user._id, gameId },
      {
        userId: user._id,
        gameId,
        username: user.username,
        score: newScore,
        updatedAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Score and leaderboard updated for user ${userId}`);
  } catch (error) {
    handleError(error, "validateAndUpdateScore");
    throw error;
  }
};
