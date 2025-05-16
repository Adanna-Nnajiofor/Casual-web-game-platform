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
// import connectDB from "./config/db";
import streetzRoutes from "./routes/streetz.routes";
// import { corsConfig } from "./config/cors.config";

const app: Application = express();

// Trust proxy - important for Render.com
app.set("trust proxy", 1);

// // CORS configuration
// app.use(cors(corsConfig));

// // Body parser middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// CORS configuration
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
//   credentials: true
// }));

const allowedOrigins = [
  "https://ezzzinne.github.io",
  "https://casual-web-game-frontend-l6h72rspu-adanna-nnajiofors-projects.vercel.app/",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5000",
  "https://casual-web-game-platform.onrender.com",
  "https://ezzzinne.github.io/playNaij-frontend",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);

// Parse JSON bodies
app.use(express.json());

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

// Health check route
app.get("/", (_req: Request, res: Response) => {
  res.send("Casual Web Game Platform Backend is running!");
});

// Swagger documentation
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

// Error handler
app.use(errorHandler);

export default app;
