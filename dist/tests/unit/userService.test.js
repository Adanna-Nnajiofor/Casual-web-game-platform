"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const user_service_1 = require("../../services/user.service");
// import User from "../../models/user.model";
require("dotenv/config");
jest.setTimeout(20000);
let mongoServer;
beforeAll(async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    //  Important: Disconnect any existing mongoose connection first
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
    }
    const uri = mongoServer.getUri();
    await mongoose_1.default.connect(uri);
});
afterEach(async () => {
    if (mongoose_1.default.connection.readyState === 1 && mongoose_1.default.connection.db) {
        await mongoose_1.default.connection.db.dropDatabase();
    }
});
afterAll(async () => {
    //  Proper cleanup
    await mongoose_1.default.connection.close();
    if (mongoServer)
        await mongoServer.stop();
});
describe("User Service", () => {
    it("should create a user", async () => {
        const userData = {
            username: "adanna",
            email: `adanna_${Date.now()}@example.com`,
            password: "securepass",
        };
        const gameId = "mock-game-id";
        const user = await (0, user_service_1.createUser)(userData, gameId);
        expect(user).toHaveProperty("_id");
        expect(user.email).toBe(userData.email);
    });
});
