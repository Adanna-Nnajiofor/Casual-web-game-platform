"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
jest.mock("jsonwebtoken");
describe("Auth Middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        process.env.JWT_SECRET = "testsecret";
        req = {
            headers: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should call next if token is valid", () => {
        const mockUser = { id: "123", email: "test@example.com" };
        // Mock jwt.verify to return mockUser when called
        jsonwebtoken_1.default.verify.mockReturnValue(mockUser);
        req.headers.authorization = "Bearer validtoken";
        (0, auth_middleware_1.authenticate)(req, res, next);
        // Ensure jwt.verify was called with the token and the mock secret
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith("validtoken", "testsecret");
        expect(req).toHaveProperty("user", mockUser);
        expect(next).toHaveBeenCalled();
    });
    it("should return 401 if token is missing", () => {
        (0, auth_middleware_1.authenticate)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Access denied. No token provided.",
        });
    });
    it("should return 401 if token is invalid", () => {
        req.headers.authorization = "Bearer invalidtoken";
        // Mock jwt.verify to throw an error when the token is invalid
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error("Invalid token");
        });
        (0, auth_middleware_1.authenticate)(req, res, next);
        // Ensure the error response message matches the expected one
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: "Invalid token",
        });
    });
});
