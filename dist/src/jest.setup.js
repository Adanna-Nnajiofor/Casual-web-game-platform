"use strict";
/// <reference types="jest" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
// Mocked MongoDB server
let mongo;
// Setup before all tests
beforeAll(async () => {
    mongo = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongo.getUri();
    await mongoose_1.default.connect(uri);
});
// Clear the database collections after each test to ensure isolation
afterEach(async () => {
    const db = mongoose_1.default.connection.db;
    if (!db) {
        throw new Error("Database connection is not established.");
    }
    const collections = await db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
// Close the database connection after all tests are done
afterAll(async () => {
    await mongoose_1.default.connection.close();
    await mongo.stop();
});
// Clear all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});
