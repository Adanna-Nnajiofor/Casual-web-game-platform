"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../../config/db"));
describe("Auth Routes", () => {
    beforeAll(async () => {
        await (0, db_1.default)();
    });
    afterAll(async () => {
        await mongoose_1.default.connection.close();
    });
    it("should register a user", async () => {
        const uniqueUsername = `adanatest_${Date.now()}`;
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/auth/register")
            .send({
            username: uniqueUsername,
            email: `${uniqueUsername}@example.com`,
            password: "password123",
        });
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
        //  expect(res.body).toHaveProperty("user");
        //  expect(res.body.user.username).toBe(uniqueUsername);
    });
    it("should not register a user with an existing username", async () => {
        const payload = {
            username: "adanatest",
            email: "test@example.com",
            password: "password123",
        };
        // Register the user once
        await (0, supertest_1.default)(app_1.default).post("/auth/register").send(payload);
        // Attempt to register again with the same username
        const res = await (0, supertest_1.default)(app_1.default).post("/auth/register").send(payload);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
    });
});
