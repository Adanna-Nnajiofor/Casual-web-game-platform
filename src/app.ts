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

const app: Application = express();

// Trust proxy - important for Render.com
app.set("trust proxy", 1);

// CORS configuration
const allowedOrigins = [
  "https://ezzzinne.github.io",
  "http://localhost:5173",
  "http://localhost:5000",
  "https://casual-web-game-platform.onrender.com",
  "http://casual-web-game-platform.onrender.com",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
  "https://casual-web-game.onrender.com",
  "http://casual-web-game.onrender.com",
];

// CORS middleware configuration
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Auth-Token",
  ],
  exposedHeaders: ["Authorization", "X-Auth-Token"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Add CORS headers to all responses
app.use((req: Request, res: Response, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
    );
    res.header("Access-Control-Expose-Headers", "Authorization, X-Auth-Token");
  }

  // Always set Vary header
  res.header("Vary", "Origin");
  next();
});

// Body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to database
connectDB();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(process.cwd(), "src/swagger.yaml"));

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

// Error handler
app.use(errorHandler);

export default app;
