import request from "supertest";
import app from "../../app";
import Leaderboard from "../../models/Leaderboard.model";
import Game from "../../models/Game.model";

// Correctly mock the auth middleware
jest.mock("../../middlewares/auth.middleware.ts", () => ({
  authenticateUser: (req: any, res: any, next: any) => {
    req.user = { id: "user1" };
    next();
  },
}));

jest.mock("../../models/Leaderboard.model.ts", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../../models/Game.model.ts", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

describe("Leaderboard Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("should fetch the leaderboard", async () => {
    const mockQuery = {
      populate: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([{ score: 100 }]),
    };

    (Leaderboard.find as jest.Mock).mockReturnValue(mockQuery);

    const res = await request(app).get("/leaderboard/game123");

    expect(res.status).toBe(200);
    expect(res.body[0].score).toBe(100);
  });

  it("should post a new score", async () => {
    (Game.findById as jest.Mock).mockResolvedValue(true);
    (Leaderboard.create as jest.Mock).mockResolvedValue({ score: 200 });

    const res = await request(app)
      .post("/leaderboard")
      .set("Authorization", "Bearer dummy-token")
      .send({ gameId: "game123", score: 200 });

    expect(res.status).toBe(201);
    expect(res.body.score).toBe(200);
  });
});
