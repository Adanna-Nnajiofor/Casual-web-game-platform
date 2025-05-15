import { Request, Response, NextFunction } from "express";

const allowedOrigins = [
  "https://ezzzinne.github.io",
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:3000",
  "https://casual-web-game-platform.onrender.com",
];

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;

  // Debug logging
  console.log("CORS Middleware - Request:", {
    origin,
    method: req.method,
    path: req.path,
  });

  // Set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    // Allow the specific origin
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // If origin is not in the list, use the first allowed origin as default
    res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  }

  // Required CORS headers
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Expose-Headers", "Authorization, X-Auth-Token");
  res.header("Vary", "Origin");

  // Handle preflight
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
};
