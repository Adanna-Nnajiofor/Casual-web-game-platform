import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticate } from "../../middlewares/auth.middleware";
import { IncomingHttpHeaders } from "http";

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
    req = {
      headers: {} as IncomingHttpHeaders,
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
    (jwt.verify as jest.Mock).mockReturnValue(mockUser);

    req.headers!.authorization = "Bearer validtoken";

    authenticate(req as Request, res as Response, next);

    // Ensure jwt.verify was called with the token and the mock secret
    expect(jwt.verify).toHaveBeenCalledWith("validtoken", "testsecret");
    expect(req).toHaveProperty("user", mockUser);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if token is missing", () => {
    authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Access denied. No token provided.",
    });
  });

  it("should return 401 if token is invalid", () => {
    req.headers!.authorization = "Bearer invalidtoken";

    // Mock jwt.verify to throw an error when the token is invalid
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authenticate(req as Request, res as Response, next);

    // Ensure the error response message matches the expected one
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid token",
    });
  });
});
