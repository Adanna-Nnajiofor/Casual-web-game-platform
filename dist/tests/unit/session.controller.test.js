"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
// Mock Session model
jest.mock("../../models/Session.model.ts");
const Session_model_1 = __importDefault(require("../../models/Session.model"));
// Mock Game model
jest.mock("../../models/Game.model.ts", () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
    },
}));
// Mock User model
jest.mock("../../models/user.model.ts", () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
    },
}));
const Game_model_1 = __importDefault(require("../../models/Game.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
// Setup Session mock constructor
const MockedSession = Session_model_1.default;
// Mock session data for save return
const mockSessionSaveData = {
    userId: "user1",
    gameId: "game1",
    score: 10,
    duration: 5,
    difficulty: "easy",
    completed: true,
    startedAt: new Date(),
};
// Mock user data
const mockUser = {
    stats: { totalGamesPlayed: 0, totalScore: 0 },
    save: jest.fn(),
};
describe("Session Controller", () => {
    beforeEach(() => {
        // Mock Session constructor behavior
        MockedSession.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockSessionSaveData),
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should save a game session successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        Game_model_1.default.findById.mockResolvedValue({ _id: "game1" });
        user_model_1.default.findById.mockResolvedValue(mockUser);
        const res = yield (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "user1",
            gameId: "game1",
            score: 10,
            duration: 5,
            difficulty: "easy",
            completed: true,
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Session saved");
        expect(MockedSession).toHaveBeenCalled();
        expect(MockedSession.mock.results[0].value.save).toHaveBeenCalled();
        expect(mockUser.save).toHaveBeenCalled();
    }));
    it("should return 404 if game is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        Game_model_1.default.findById.mockResolvedValue(null);
        const res = yield (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "user1",
            gameId: "nonexistent",
            score: 5,
            duration: 3,
            difficulty: "medium",
            completed: false,
        });
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Game not found");
    }));
    it("should update user stats if user is found", () => __awaiter(void 0, void 0, void 0, function* () {
        Game_model_1.default.findById.mockResolvedValue({ _id: "game1" });
        user_model_1.default.findById.mockResolvedValue(mockUser);
        yield (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "user1",
            gameId: "game1",
            score: 20,
            duration: 10,
            difficulty: "hard",
            completed: true,
        });
        expect(mockUser.stats.totalGamesPlayed).toBe(1);
        expect(mockUser.stats.totalScore).toBe(20);
    }));
    it("should handle missing user without crashing", () => __awaiter(void 0, void 0, void 0, function* () {
        Game_model_1.default.findById.mockResolvedValue({ _id: "game1" });
        user_model_1.default.findById.mockResolvedValue(null);
        const res = yield (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "missingUser",
            gameId: "game1",
            score: 15,
            duration: 8,
            difficulty: "easy",
            completed: false,
        });
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Session saved");
    }));
    it("should return 500 on internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
        Game_model_1.default.findById.mockRejectedValue(new Error("DB error"));
        const res = yield (0, supertest_1.default)(app_1.default).post("/sessions").send({
            userId: "user1",
            gameId: "game1",
            score: 5,
            duration: 2,
            difficulty: "easy",
            completed: false,
        });
        expect(res.status).toBe(500);
        expect(res.body.message).toBe("Server error");
    }));
});
