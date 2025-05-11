import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { verifyFirebaseToken } from "../utils/verifyFirebaseToken";
import "../config/env";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// REGISTER SERVICE
export const registerUserService = async (
  username: string,
  email: string,
  password: string
) => {
  // Check if either email or username already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error("User with this email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user: newUser };
};

// LOGIN SERVICE
export const loginUserService = async (username: string, password: string) => {
  const trimmedUsername = username.trim();

  const user = await User.findOne({ username: trimmedUsername });

  if (!user) {
    throw new Error(`User with username "${username}" not found.`);
  }

  if (!user.password) {
    throw new Error(
      "This user has no password set. Try logging in with social login."
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    user,
    welcomeMessage: `Welcome ${user.username}`,
  };
};

// SOCIAL LOGIN SERVICE (Google/Facebook)
export const socialLoginService = async (idToken: string) => {
  if (!idToken) {
    throw new Error("ID token is required");
  }

  try {
    // Verify the Firebase ID token
    const decoded = await verifyFirebaseToken(idToken);
    const { uid, email, name, picture, firebase } = decoded;

    // Check if email is undefined
    if (!email) {
      throw new Error("Email is required from Firebase");
    }

    // Check if user exists by email (Google or Facebook login can be identified by the provider)
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        username: name || email.split("@")[0],
        email,
        provider: firebase?.sign_in_provider || "social",
        avatar: picture,
        firebaseUid: uid,
        lastLogin: new Date(),
        stats: {
          totalGamesPlayed: 0,
          totalScore: 0,
          achievements: [],
        },
        friends: [],
      });

      await user.save();
    }

    // Generate JWT for your app
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user };
  } catch (error: any) {
    throw new Error("Social login failed");
  }
};
