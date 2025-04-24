import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

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
