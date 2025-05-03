import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
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
export const loginUserService = async (
  identifier: string,
  password: string
) => {
  try {
    // Check if the identifier is an email (simpler check)
    const isEmail = identifier.includes("@") && identifier.includes(".");

    const trimmedIdentifier = identifier.trim();

    const user = await User.findOne(
      isEmail ? { email: trimmedIdentifier } : { username: trimmedIdentifier }
    );

    // If no user is found (whether email or username), throw an error
    if (!user) {
      throw new Error(
        `User with ${isEmail ? "email" : "username"} "${identifier}" not found.`
      );
    }

    // Check if the password matches the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials. Please check your password.");
    }

    // Generate JWT token for the user
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      user,
      welcomeMessage: `Welcome ${user.username}`,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during login");
  }
};
