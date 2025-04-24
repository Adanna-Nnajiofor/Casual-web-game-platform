import request from "supertest";
import app from "../../app";
import User from "../../models/user.model";

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
  authenticate: (req: any, res: any, next: any) => next(),
}));

describe("User Controller", () => {
  afterEach(() => jest.clearAllMocks()); // Clear mocks after each test

  it("should return all users", async () => {
    (User.find as jest.Mock).mockResolvedValue([{ username: "TestUser" }]);

    const res = await request(app).get("/user");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].username).toBe("TestUser");
  });

  it("should return a user by ID", async () => {
    (User.findById as jest.Mock).mockResolvedValue({ username: "TestUser" });

    const res = await request(app).get("/user/123");

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("TestUser");
  });

  it("should update user by ID", async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({
      username: "UpdatedUser",
    });

    const res = await request(app)
      .patch("/user/123")
      .send({ username: "UpdatedUser" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User updated");
    expect(res.body.user.username).toBe("UpdatedUser");
  });

  it("should delete user by ID", async () => {
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: "123" });

    const res = await request(app).delete("/user/123");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });

  it("should return 404 if user is not found for deletion", async () => {
    (User.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete("/user/123");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
});
