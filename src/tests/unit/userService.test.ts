import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createUser } from "../../services/user.service";
import { CreateUserInput } from "../../types/user";
import User from "../../models/user.model";
import "dotenv/config";

jest.setTimeout(20000);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  //  Important: Disconnect any existing mongoose connection first
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  //  Proper cleanup
  await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
});

describe("User Service", () => {
  it("should create a user", async () => {
    const userData: CreateUserInput = {
      username: "adanna",
      email: `adanna_${Date.now()}@example.com`,
      password: "securepass",
    };

    const gameId = "mock-game-id";
    const user = await createUser(userData, gameId);

    expect(user).toHaveProperty("_id");
    expect(user.email).toBe(userData.email);
  });
});
