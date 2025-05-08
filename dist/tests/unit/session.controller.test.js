"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const Game_model_1 = __importDefault(require("../../models/Game.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
// Mock Game model
jest.mock("../../models/Game.model", () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
    },
}));
// Mock User model
jest.mock("../../models/user.model", () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
    },
}));
// Mock Session model with the save method
jest.mock("../../models/Session.model", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({}), // Mock the save method
    })),
}));
describe("Session Controller", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    it("should save a game session successfully", async () => {
        const mockGame = { _id: "game1", title: "Game One" };
        const mockUser = {
            _id: "user1",
            stats: { totalGamesPlayed: 0, totalScore: 0 },
            save: jest.fn(), // Mock save method of User model
        };
        // Mock database calls
        Game_model_1.default.findById.mockResolvedValue(mockGame);
        user_model_1.default.findById.mockResolvedValue(mockUser);
        const res = await (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "user1",
            gameId: "game1",
            score: 10,
            duration: 5,
            difficulty: "easy",
            completed: true,
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Session saved");
        expect(mockUser.save).toHaveBeenCalled(); // Ensure User.save was called
    });
    it("should return 404 if game is not found", async () => {
        Game_model_1.default.findById.mockResolvedValue(null); // Mock game not found
        const res = await (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "user1",
            gameId: "nonexistent-game",
            score: 10,
            duration: 5,
            difficulty: "easy",
            completed: true,
        });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Game not found");
    });
    it("should return 500 if there is a server error", async () => {
        const mockUser = {
            _id: "user1",
            stats: { totalGamesPlayed: 0, totalScore: 0 },
            save: jest.fn(),
        };
        // Mock errors for Game and User model
        Game_model_1.default.findById.mockRejectedValue(new Error("DB error"));
        user_model_1.default.findById.mockResolvedValue(mockUser); // Mock user retrieval
        const res = await (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "user1",
            gameId: "game1",
            score: 10,
            duration: 5,
            difficulty: "easy",
            completed: true,
        });
        expect(res.status).toBe(500);
        expect(res.body.message).toBe("Server error");
    });
});
