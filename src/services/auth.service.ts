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
export const loginUserService = async (username: string, password: string) => {
  const trimmedUsername = username.trim();

  const user = await User.findOne({ username: trimmedUsername });

  if (!user) {
    throw new Error(`User with username "${username}" not found.`);
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
