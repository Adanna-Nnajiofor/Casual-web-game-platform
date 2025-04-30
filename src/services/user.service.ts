import { CreateUserInput } from "../types/user";
import User, { IUser } from "../models/user.model";
import { validateAndUpdateScore } from "../services/score.service";

export const createUser = async (data: CreateUserInput): Promise<IUser> => {
  // Initialize a default score (0, or any other default value)
  const initialScore = 0;

  // Create a new user
  const user = new User({
    ...data,
    stats: {
      totalScore: initialScore,
      totalGamesPlayed: 0,
      achievements: [],
    },
    friends: [],
  });

  try {
    // Save the user in the database
    const savedUser = await user.save();

    // Optionally validate the score after creating the user
    await validateAndUpdateScore(savedUser._id.toString(), initialScore);

    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed.");
  }
};
