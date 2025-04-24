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
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const userService_1 = require("../../services/userService");
const user_model_1 = __importDefault(require("../../models/user.model"));
require("dotenv/config");
jest.setTimeout(20000);
let mongoServer;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.deleteMany({}); // Clear all users before each test
}));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    yield mongoose_1.default.connect(uri);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    if (mongoServer)
        yield mongoServer.stop();
}));
describe("User Service", () => {
    it("should create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            username: "adanna",
            email: `adanna_${Date.now()}@example.com`,
            password: "securepass",
        };
        const user = yield (0, userService_1.createUser)(userData);
        expect(user).toHaveProperty("_id");
        expect(user.email).toBe(userData.email);
    }));
});
