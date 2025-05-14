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

const corsOptions = {
  origin: ["https://ezzzinne.github.io", "http://localhost:5173", "*"],
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

//middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.set("trust proxy", 1);

// Swagger docs
const swaggerDocument = YAML.load(path.join(process.cwd(), "src/swagger.yaml"));

app.use(express.json());

connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
app.use("/sessions", sessionRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/user", userRoutes);
app.use("/friends", friendsRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/trivia", triviaRoutes);
app.use("/streetz", streetzRoutes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Casual Web Game Platform Backend is running!");
});

app.use(errorHandler);

export default app;
