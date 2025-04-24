import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createUser } from "../../services/userService";
import { CreateUserInput } from "../../types/user";
import User from "../../models/user.model";
import "dotenv/config";

jest.setTimeout(20000);

let mongoServer: MongoMemoryServer;

beforeEach(async () => {
  await User.deleteMany({}); // Clear all users before each test
});

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe("User Service", () => {
  it("should create a user", async () => {
    const userData: CreateUserInput = {
      username: "adanna",
      email: `adanna_${Date.now()}@example.com`,
      password: "securepass",
    };

    const user = await createUser(userData);

    expect(user).toHaveProperty("_id");
    expect(user.email).toBe(userData.email);
  });
});
