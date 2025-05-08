import { CreateUserInput } from "../types/user";
import User, { IUser } from "../models/user.model";
import { validateAndUpdateScore } from "../services/score.service";
// import { AvatarService } from "../services/avatar.service";

// Create a new user
export const createUser = async (
  data: CreateUserInput,
  avatarUrl: string
): Promise<IUser> => {
  const initialScore = 0;

  const user = new User({
    ...data,
    stats: {
      totalScore: initialScore,
      totalGamesPlayed: 0,
      achievements: [],
    },
    friends: [],
    avatar: avatarUrl,
  });

  try {
    const savedUser = await user.save();
    await validateAndUpdateScore(savedUser._id.toString(), initialScore, "");
    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User creation failed.");
  }
};

// Get all users
export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

// Get user by ID
export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(`Error fetching user with id ${userId}`);
  }
};

// Update user details
export const updateUser = async (
  userId: string,
  data: Partial<CreateUserInput>,
  avatarUrl?: string
): Promise<IUser | null> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { ...data, avatar: avatarUrl } },
      { new: true }
    );
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

// Add a friend (bi-directional)
export const addFriend = async (
  userId: string,
  friendId: string
): Promise<IUser | null> => {
  try {
    if (userId === friendId) {
      throw new Error("You cannot add yourself as a friend.");
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      throw new Error("User or friend not found");
    }

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
    }

    if (!friend.friends.includes(user._id)) {
      friend.friends.push(user._id);
      await friend.save();
    }

    return user;
  } catch (error) {
    throw new Error("Failed to add friend");
  }
};

// Update user stats
export const updateUserStats = async (
  userId: string,
  totalScore: number,
  totalGamesPlayed: number,
  achievements: string[],
  gameId: string
): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    await validateAndUpdateScore(userId, totalScore, gameId);

    user.stats.totalGamesPlayed += totalGamesPlayed;
    user.stats.achievements.push(...achievements);

    await user.save();
    return user;
  } catch (error) {
    throw new Error("Failed to update stats");
  }
};

// Get all friends of a user
export const getUserFriends = async (userId: string): Promise<IUser[]> => {
  try {
    const user = await User.findById(userId).populate<{ friends: IUser[] }>(
      "friends"
    );
    if (!user) throw new Error("User not found");
    return user.friends;
  } catch (error) {
    throw new Error("Error fetching friends");
  }
};

// Delete user by ID
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
