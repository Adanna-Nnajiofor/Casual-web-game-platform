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
const app = (0, express_1.default)();
// Swagger docs
const swaggerDocument = yamljs_1.default.load(path_1.default.join(process.cwd(), "src/swagger.yaml"));
// Middleware
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN }));
app.use(express_1.default.json());
// Routes
app.use("/auth", auth_routes_1.default);
app.use("/games", game_routes_1.default);
app.use("/sessions", session_routes_1.default);
app.use("/leaderboard", leaderboard_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/friends", friends_routes_1.default);
app.use("/feedback", feedback_routes_1.default);
app.use("/trivia", trivia_routes_1.default);
app.use(error_handler_1.errorHandler);
// Swagger documentation
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Health check
app.get("/", (_req, res) => {
    res.send("Casual Web Game Platform Backend is running!");
});
exports.default = app;
