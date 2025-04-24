/// <reference types="jest" />

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// Mocked MongoDB server
let mongo: MongoMemoryServer;

// Setup before all tests
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

// Clear the database collections after each test to ensure isolation
afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database connection is not established.");
  }

  const collections = await db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Close the database connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
