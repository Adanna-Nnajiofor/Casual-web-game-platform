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
const user_model_1 = __importDefault(require("../../models/user.model"));
//  Properly mock the default export of the User model
jest.mock("../../models/user.model.ts", () => {
    return {
        __esModule: true,
        default: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
        },
    };
});
// Mock the authentication middleware
jest.mock("../../middlewares/auth.middleware.ts", () => ({
    authenticate: (req, res, next) => next(),
}));
describe("User Controller", () => {
    afterEach(() => jest.clearAllMocks()); // Clear mocks after each test
    it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.find.mockResolvedValue([{ username: "TestUser" }]);
        const res = yield (0, supertest_1.default)(app_1.default).get("/user");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].username).toBe("TestUser");
    }));
    it("should return a user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findById.mockResolvedValue({ username: "TestUser" });
        const res = yield (0, supertest_1.default)(app_1.default).get("/user/123");
        expect(res.status).toBe(200);
        expect(res.body.username).toBe("TestUser");
    }));
    it("should update user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findByIdAndUpdate.mockResolvedValue({
            username: "UpdatedUser",
        });
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch("/user/123")
            .send({ username: "UpdatedUser" });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User updated");
        expect(res.body.user.username).toBe("UpdatedUser");
    }));
    it("should delete user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findByIdAndDelete.mockResolvedValue({ _id: "123" });
        const res = yield (0, supertest_1.default)(app_1.default).delete("/user/123");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User deleted");
    }));
    it("should return 404 if user is not found for deletion", () => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findByIdAndDelete.mockResolvedValue(null);
        const res = yield (0, supertest_1.default)(app_1.default).delete("/user/123");
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("User not found");
    }));
});
