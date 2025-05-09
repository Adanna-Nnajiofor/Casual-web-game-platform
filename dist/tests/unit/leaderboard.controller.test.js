"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const Leaderboard_model_1 = __importDefault(require("../../models/Leaderboard.model"));
const Game_model_1 = __importDefault(require("../../models/Game.model"));
// Correctly mock the auth middleware
jest.mock("../../middlewares/auth.middleware.ts", () => ({
    authenticateUser: (req, res, next) => {
        req.user = { id: "user1" };
        next();
    },
}));
jest.mock("../../models/Leaderboard.model.ts", () => ({
    __esModule: true,
    default: {
        find: jest.fn(),
        create: jest.fn(),
    },
}));
jest.mock("../../models/Game.model.ts", () => ({
    __esModule: true,
    default: {
        findById: jest.fn(),
    },
}));
describe("Leaderboard Controller", () => {
    afterEach(() => jest.clearAllMocks());
    it("should fetch the leaderboard", async () => {
        const mockQuery = {
            populate: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([{ score: 100 }]),
        };
        Leaderboard_model_1.default.find.mockReturnValue(mockQuery);
        const res = await (0, supertest_1.default)(app_1.default).get("/leaderboard/game123");
        expect(res.status).toBe(200);
        expect(res.body[0].score).toBe(100);
    });
    it("should post a new score", async () => {
        Game_model_1.default.findById.mockResolvedValue(true);
        Leaderboard_model_1.default.create.mockResolvedValue({ score: 200 });
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/leaderboard")
            .set("Authorization", "Bearer dummy-token")
            .send({ gameId: "game123", score: 200 });
        expect(res.status).toBe(201);
        expect(res.body.score).toBe(200);
    });
});
