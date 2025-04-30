import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { admin } from "../config/firebase-admin";
import { IUserWithExp } from "../types/IUserWithExp";
import { DecodedIdToken } from "firebase-admin/auth";

// Extend the Request interface to include user data
declare global {
  namespace Express {
    interface Request {
      user?: IUserWithExp | DecodedIdToken; // User can be of type IUserWithExp or Firebase DecodedIdToken
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return; // Return here to prevent continuing to the next middleware
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  // First, try verifying as JWT token
  try {
    const secret = process.env.JWT_SECRET || "testsecret";
    const decodedJwt = jwt.verify(token, secret) as IUserWithExp;

    // Check if the JWT token is expired
    if (decodedJwt.exp && decodedJwt.exp < Math.floor(Date.now() / 1000)) {
      res.status(401).json({ message: "JWT token has expired" });
      return; // Return here to prevent continuing to the next middleware
    }

    req.user = decodedJwt; // If valid JWT, assign decoded user data
    return next(); // Continue to next middleware or route handler
  } catch (jwtError: any) {
    // If JWT verification fails, proceed to try Firebase token
    if (jwtError.name === "TokenExpiredError") {
      res.status(401).json({ message: "JWT token has expired" });
      return; // Return here to prevent continuing to the next middleware
    }
  }

  // If JWT verification fails, try verifying as Firebase token
  try {
    const decodedFirebaseToken: DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);

    // Check if the Firebase token is expired (Firebase tokens are valid for 1 hour)
    const issuedAt = decodedFirebaseToken.auth_time;
    const expirationTime = 3600; // Firebase tokens expire after 1 hour
    if (Math.floor(Date.now() / 1000) - issuedAt > expirationTime) {
      res.status(401).json({ message: "Firebase token has expired" });
      return; // Return here to prevent continuing to the next middleware
    }

    req.user = decodedFirebaseToken; // If valid Firebase token, assign decoded token data
    return next(); // Continue to next middleware or route handler
  } catch (firebaseError: any) {
    // If both JWT and Firebase verification fail, return 401 Unauthorized
    res.status(401).json({
      message: "Invalid token",
      error: firebaseError.message || "Unknown error",
    });
    return; // Return here to prevent continuing to the next middleware
  }
};
