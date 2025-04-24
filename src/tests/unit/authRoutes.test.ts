import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import connectDB from "../../config/db";

describe("Auth Routes", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a user", async () => {
    const uniqueUsername = `adanatest_${Date.now()}`;
    const res = await request(app)
      .post("/auth/register")
      .send({
        username: uniqueUsername,
        email: `${uniqueUsername}@example.com`,
        password: "password123",
      });

    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    //  expect(res.body).toHaveProperty("user");
    //  expect(res.body.user.username).toBe(uniqueUsername);
  });

  it("should not register a user with an existing username", async () => {
    const payload = {
      username: "adanatest",
      email: "test@example.com",
      password: "password123",
    };

    // Register the user once
    await request(app).post("/auth/register").send(payload);

    // Attempt to register again with the same username
    const res = await request(app).post("/auth/register").send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});
