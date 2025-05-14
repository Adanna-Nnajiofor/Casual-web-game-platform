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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  console.log("CORS Headers Set");
  next();
});

app.set("trust proxy", 1);

// Swagger docs
const swaggerDocument = YAML.load(path.join(process.cwd(), "src/swagger.yaml"));

// Middleware
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: "https://ezzzinne.github.io",
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request from origin:", origin);
      callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

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
