import { RequestHandler } from "express";
import { validate } from "../utils/validate";
import { registerSchema, loginSchema } from "../utils/validate";
import {
  registerUserService,
  loginUserService,
  socialLoginService,
} from "../services/auth.service";

// REGISTER CONTROLLER
export const registerUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    console.log("Register Request:", {
      headers: req.headers,
      method: req.method,
      origin: req.headers.origin,
    });

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
    console.error("Registration error:", error);
    res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};

// LOGIN CONTROLLER
export const loginUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    console.log("Login Request:", {
      headers: req.headers,
      method: req.method,
      origin: req.headers.origin,
    });

    const validation = validate(loginSchema, req.body);

    if (!validation.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: validation.errors,
      });
      return;
    }

    const { username, password } = validation.data!;

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
    console.error("Login error:", error);
    res.status(401).json({
      message: error.message || "Login failed",
    });
  }
};

// SOCIAL LOGIN CONTROLLER (Google/Facebook)
export const socialLogin: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({ message: "ID token is required" });
      return;
    }

    const { token, user } = await socialLoginService(idToken);

    res.status(200).json({
      message: `Welcome ${user.username}`,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    console.error("Social login error:", error);
    res.status(401).json({ message: error.message || "Social login failed" });
  }
};
