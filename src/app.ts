import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import { errorHandler } from "./middlewares/error.handler";
import authRoutes from "./routes/auth.routes";
import gameRoutes from "./routes/game.routes";
import sessionRoutes from "./routes/session.routes";
import leaderboardRoutes from "./routes/leaderboard.routes";
import userRoutes from "./routes/user.routes";
import friendsRoutes from "./routes/friends.routes";
import feedbackRoutes from "./routes/feedback.routes";
import triviaRoutes from "./routes/trivia.routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import connectDB from "./config/db";
import streetzRoutes from "./routes/streetz.routes";
import { corsConfig, setCorsHeaders } from "./config/cors.config";

const app: Application = express();

// Trust proxy - important for Render.com
app.set("trust proxy", 1);

// CORS middleware - must be before any routes
app.use(cors(corsConfig));

// Add CORS headers to all responses
app.use((req: Request, res: Response, next) => {
  setCorsHeaders(req, res);
  next();
});

// Detailed request logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("Headers:", req.headers);
  next();
});

// Body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to database
connectDB();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(process.cwd(), "src/swagger.yaml"));

// Mount API routes with logging
app.use(
  "/api/games",
  (req: Request, res: Response, next) => {
    console.log("Games route hit:", req.path);
    next();
  },
  gameRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friends", friendsRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/trivia", triviaRoutes);
app.use("/api/streetz", streetzRoutes);

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Casual Web Game Platform Backend is running!");
});

// Swagger documentation
app.use("/api-docs", swaggerUi.serve);
app.get(
  "/api-docs",
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null,
    },
  })
);

// Error handler - must be after all routes
app.use(errorHandler);

export default app;
