import { RequestHandler } from "express";
import { validate } from "../utils/validate";
import { registerSchema, loginSchema } from "../utils/validate";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service";

// REGISTER CONTROLLER
export const registerUser: RequestHandler = async (req, res): Promise<void> => {
  // Validate the registration data using the registerSchema
  const validation = validate(registerSchema, req.body);

  if (!validation.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: validation.errors,
    });
    return;
  }

  const { username, email, password } = validation.data!;

  try {
    const { token, user } = await registerUserService(
      username,
      email,
      password
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};

// LOGIN CONTROLLER
export const loginUser: RequestHandler = async (req, res): Promise<void> => {
  const validation = validate(loginSchema, req.body);

  if (!validation.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: validation.errors,
    });
    return;
  }

  const { username, password } = validation.data!;

  try {
    const { token, user, welcomeMessage } = await loginUserService(
      username,
      password
    );

    res.status(200).json({
      message: welcomeMessage,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    res.status(401).json({
      message: error.message || "Login failed",
    });
  }
};
