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
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../../config/db"));
describe("Auth Routes", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, db_1.default)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it("should register a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const uniqueUsername = `adanatest_${Date.now()}`;
        const res = yield (0, supertest_1.default)(app_1.default)
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
    }));
    it("should not register a user with an existing username", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            username: "adanatest",
            email: "test@example.com",
            password: "password123",
        };
        // Register the user once
        yield (0, supertest_1.default)(app_1.default).post("/auth/register").send(payload);
        // Attempt to register again with the same username
        const res = yield (0, supertest_1.default)(app_1.default).post("/auth/register").send(payload);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("message");
    }));
});
