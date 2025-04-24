import request from "supertest";
import app from "../../app";
import Game from "../../models/Game.model";

// Mock the Game model
jest.mock("../../models/Game.model.ts", () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Game Controller", () => {
  afterEach(() => jest.clearAllMocks()); // Clear mocks after each test

  it("should fetch all games", async () => {
    // Mock the resolved value for the find method
    (Game.find as jest.Mock).mockResolvedValue([{ title: "Game One" }]);

    const res = await request(app).get("/games");

    expect(res.status).toBe(200);
    expect(res.body[0].title).toBe("Game One");
  });

  it("should fetch a game by slug", async () => {
    // Mock the resolved value for the findOne method
    (Game.findOne as jest.Mock).mockResolvedValue({ slug: "slug-game" });

    const res = await request(app).get("/games/slug-game");

    expect(res.status).toBe(200);
    expect(res.body.slug).toBe("slug-game");
  });
});
