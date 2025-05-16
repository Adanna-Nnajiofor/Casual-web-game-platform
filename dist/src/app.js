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
const db_1 = __importDefault(require("./config/db"));
const streetz_routes_1 = __importDefault(require("./routes/streetz.routes"));
const cors_config_1 = require("./config/cors.config");
const app = (0, express_1.default)();
// Trust proxy - important for Render.com
app.set("trust proxy", 1);
// Apply CORS configuration
app.use((0, cors_1.default)(cors_config_1.corsConfig));
// Pre-flight requests
app.options("*", (0, cors_1.default)(cors_config_1.corsConfig));
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Connect to database
(0, db_1.default)();
// Health check route
app.get("/", (_req, res) => {
    res.send("Casual Web Game Platform Backend is running!");
});
// Setup Swagger documentation
try {
    const swaggerPath = path_1.default.join(process.cwd(), "src/swagger.yaml");
    const swaggerDocument = yamljs_1.default.load(swaggerPath);
    // Serve Swagger UI at /api-docs
    app.use("/api-docs", swagger_ui_express_1.default.serve);
    app.get("/api-docs", swagger_ui_express_1.default.setup(swaggerDocument, {
        explorer: true,
        customSiteTitle: "Casual Game Platform API Documentation",
    }));
}
catch (error) {
    console.error("Failed to load Swagger documentation:", error);
}
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
// Error handler
app.use(error_handler_1.errorHandler);
exports.default = app;
