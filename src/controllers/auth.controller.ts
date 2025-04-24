import { Request, Response, RequestHandler } from "express";
import { registerSchema, loginSchema } from "../utils/validate";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service";

// Register
export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.format(),
    });
    return;
  }

  const { username, email, password } = parsed.data;

  try {
    const { token, user } = await registerUserService(
      username,
      email,
      password
    );
    res.status(201).json({ message: "User registered", token, user });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};

// Login
export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsed.error.format(),
    });
    return;
  }

  const { email, password } = parsed.data;

  try {
    const { token, user } = await loginUserService(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Login failed" });
  }
};
