import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import "../config/env";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const registerUserService = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
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

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
};
