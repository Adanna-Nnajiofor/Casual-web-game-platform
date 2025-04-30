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
const user_service_1 = require("../../services/user.service");
require("dotenv/config");
jest.setTimeout(20000);
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
    //  Important: Disconnect any existing mongoose connection first
    if (mongoose_1.default.connection.readyState !== 0) {
        yield mongoose_1.default.disconnect();
    }
    const uri = mongoServer.getUri();
    yield mongoose_1.default.connect(uri);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState === 1 && mongoose_1.default.connection.db) {
        yield mongoose_1.default.connection.db.dropDatabase();
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //  Proper cleanup
    yield mongoose_1.default.connection.close();
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
        const user = yield (0, user_service_1.createUser)(userData);
        expect(user).toHaveProperty("_id");
        expect(user.email).toBe(userData.email);
    }));
});
