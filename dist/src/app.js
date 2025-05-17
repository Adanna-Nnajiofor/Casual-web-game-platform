"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const error_handler_1 = require("./middlewares/error.handler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const game_routes_1 = __importDefault(require("./routes/game.routes"));
const session_routes_1 = __importDefault(require("./routes/session.routes"));
const leaderboard_routes_1 = __importDefault(require("./routes/leaderboard.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const friends_routes_1 = __importDefault(require("./routes/friends.routes"));
const feedback_routes_1 = __importDefault(require("./routes/feedback.routes"));
const trivia_routes_1 = __importDefault(require("./routes/trivia.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
// import connectDB from "./config/db";
const streetz_routes_1 = __importDefault(require("./routes/streetz.routes"));
// import { corsConfig } from "./config/cors.config";
const app = (0, express_1.default)();
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
    "https://casual-web-game-frontend-l6h72rspu-adanna-nnajiofors-projects.vercel.app",
    "https://casual-web-game-frontend-cyl3ehxu1-adanna-nnajiofors-projects.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5000",
    "https://casual-web-game-platform.onrender.com",
    "https://ezzzinne.github.io/playNaij-frontend",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
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
}));
app.options("*", (0, cors_1.default)());
// Parse JSON bodies
app.use(express_1.default.json());
// Load Swagger document
const swaggerDocument = yamljs_1.default.load(path_1.default.join(process.cwd(), "src/swagger.yaml"));
// Mount API routes
app.use("/api/games", game_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/sessions", session_routes_1.default);
app.use("/api/leaderboard", leaderboard_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/friends", friends_routes_1.default);
app.use("/api/feedback", feedback_routes_1.default);
app.use("/api/trivia", trivia_routes_1.default);
app.use("/api/streetz", streetz_routes_1.default);
// Health check route
app.get("/", (_req, res) => {
    res.send("Casual Web Game Platform Backend is running!");
});
// Swagger documentation
app.use("/api-docs", swagger_ui_express_1.default.serve);
app.get("/api-docs", swagger_ui_express_1.default.setup(swaggerDocument));
// Error handler
app.use(error_handler_1.errorHandler);
exports.default = app;
