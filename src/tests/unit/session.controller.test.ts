import request from "supertest";
import app from "../../app";

// Mock Session model
jest.mock("../../models/Session.model.ts");
import Session from "../../models/Session.model";

// Mock Game model
jest.mock("../../models/Game.model.ts", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

// Mock User model
jest.mock("../../models/user.model.ts", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

import Game from "../../models/Game.model";
import User from "../../models/user.model";

// Setup Session mock constructor
const MockedSession = Session as unknown as jest.Mock<any, any>;

// Mock session data for save return
const mockSessionSaveData = {
  userId: "user1",
  gameId: "game1",
  score: 10,
  duration: 5,
  difficulty: "easy",
  completed: true,
  startedAt: new Date(),
};

// Mock user data
const mockUser = {
  stats: { totalGamesPlayed: 0, totalScore: 0 },
  save: jest.fn(),
};

describe("Session Controller", () => {
  beforeEach(() => {
    // Mock Session constructor behavior
    MockedSession.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockSessionSaveData),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save a game session successfully", async () => {
    (Game.findById as jest.Mock).mockResolvedValue({ _id: "game1" });
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).post("/sessions").send({
      userId: "user1",
      gameId: "game1",
      score: 10,
      duration: 5,
      difficulty: "easy",
      completed: true,
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Session saved");

    expect(MockedSession).toHaveBeenCalled();
    expect(MockedSession.mock.results[0].value.save).toHaveBeenCalled();
    expect(mockUser.save).toHaveBeenCalled();
  });

  it("should return 404 if game is not found", async () => {
    (Game.findById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post("/sessions").send({
      userId: "user1",
      gameId: "nonexistent",
      score: 5,
      duration: 3,
      difficulty: "medium",
      completed: false,
    });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Game not found");
  });

  it("should update user stats if user is found", async () => {
    (Game.findById as jest.Mock).mockResolvedValue({ _id: "game1" });
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    await request(app).post("/sessions").send({
      userId: "user1",
      gameId: "game1",
      score: 20,
      duration: 10,
      difficulty: "hard",
      completed: true,
    });

    expect(mockUser.stats.totalGamesPlayed).toBe(1);
    expect(mockUser.stats.totalScore).toBe(20);
  });

  it("should handle missing user without crashing", async () => {
    (Game.findById as jest.Mock).mockResolvedValue({ _id: "game1" });
    (User.findById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).post("/sessions").send({
      userId: "missingUser",
      gameId: "game1",
      score: 15,
      duration: 8,
      difficulty: "easy",
      completed: false,
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Session saved");
  });

  it("should return 500 on internal server error", async () => {
    (Game.findById as jest.Mock).mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/sessions").send({
      userId: "user1",
      gameId: "game1",
      score: 5,
      duration: 2,
      difficulty: "easy",
      completed: false,
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Server error");
  });
});
