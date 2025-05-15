import { CorsOptions } from "cors";
import cors from "cors";
import { Application } from "express";

const allowedOrigins = [
  "https://ezzzinne.github.io",
  "http://localhost:5173",
  "http://localhost:5000",
  "http://localhost:3000",
  "https://casual-web-game-platform.onrender.com",
  "http://casual-web-game-platform.onrender.com",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "https://casual-web-game.onrender.com",
  "http://casual-web-game.onrender.com",
];

export const corsConfig: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Auth-Token",
  ],
  exposedHeaders: ["Authorization", "X-Auth-Token"],
  maxAge: 86400,
  optionsSuccessStatus: 204,
};

// Function to setup CORS in the Express app
export function setupCors(app: Application): void {
  // Apply CORS middleware
  app.use(cors(corsConfig));

  // Handle OPTIONS preflight requests
  app.options("*", cors(corsConfig));

  // Additional middleware to ensure CORS headers are always set
  app.use((req, res, next) => {
    const origin = req.headers.origin;

    // Always set Vary header
    res.setHeader("Vary", "Origin");

    // Set CORS headers for allowed origins
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization,X-Auth-Token"
      );
      res.setHeader(
        "Access-Control-Expose-Headers",
        "Authorization, X-Auth-Token"
      );
    }

    next();
  });
}
