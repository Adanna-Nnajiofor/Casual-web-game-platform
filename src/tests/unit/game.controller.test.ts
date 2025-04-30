import request from "supertest";
import app from "../../app";
import Game from "../../models/Game.model";

// Mock the Game model
jest.mock("../../models/Game.model", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Game Controller", () => {
  afterEach(() => jest.clearAllMocks()); // Clear mocks after each test

  it("should fetch a game by slug", async () => {
    // Mock the Game.findOne response to return a dummy game
    const game = { title: "Game One", slug: "slug-game" };
    (Game.findOne as jest.Mock).mockResolvedValue(game); // Mock the response

    const res = await request(app).get("/games/slug-game");

    expect(res.status).toBe(200);
    expect(res.body.slug).toBe("slug-game");
    expect(res.body.title).toBe("Game One");
  });

  it("should return 404 if game not found", async () => {
    // Mock the findOne method to return null when the game is not found
    (Game.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/games/nonexistent-slug");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Game not found");
  });
});
