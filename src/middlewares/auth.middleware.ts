import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user info to the request object
    req.user = decoded as IUser;

    next(); // Proceed to route
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
