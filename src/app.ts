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
import { corsConfig } from "./config/cors.config";

const app: Application = express();

// Trust proxy - important for Render.com
app.set("trust proxy", 1);

// Apply CORS configuration
app.use(cors(corsConfig));

// Pre-flight requests
app.options("*", cors(corsConfig));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.send("Casual Web Game Platform Backend is running!");
});

// Setup Swagger documentation
try {
  const swaggerPath = path.join(process.cwd(), "src/swagger.yaml");
  const swaggerDocument = YAML.load(swaggerPath);

  // Serve Swagger UI at /api-docs
  app.use("/api-docs", swaggerUi.serve);
  app.get(
    "/api-docs",
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
      customSiteTitle: "Casual Game Platform API Documentation",
    })
  );
} catch (error) {
  console.error("Failed to load Swagger documentation:", error);
}

// Mount API routes
app.use("/api/games", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friends", friendsRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/trivia", triviaRoutes);
app.use("/api/streetz", streetzRoutes);

// Error handler
app.use(errorHandler);

export default app;
