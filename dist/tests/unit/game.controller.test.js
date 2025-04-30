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
const Game_model_1 = __importDefault(require("../../models/Game.model"));
// Mock the Game model
jest.mock("../../models/Game.model", () => ({
    __esModule: true,
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));
describe("Game Controller", () => {
    afterEach(() => jest.clearAllMocks()); // Clear mocks after each test
    it("should fetch a game by slug", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the Game.findOne response to return a dummy game
        const game = { title: "Game One", slug: "slug-game" };
        Game_model_1.default.findOne.mockResolvedValue(game); // Mock the response
        const res = yield (0, supertest_1.default)(app_1.default).get("/games/slug-game");
        expect(res.status).toBe(200);
        expect(res.body.slug).toBe("slug-game");
        expect(res.body.title).toBe("Game One");
    }));
    it("should return 404 if game not found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the findOne method to return null when the game is not found
        Game_model_1.default.findOne.mockResolvedValue(null);
        const res = yield (0, supertest_1.default)(app_1.default).get("/games/nonexistent-slug");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Game not found");
    }));
});
