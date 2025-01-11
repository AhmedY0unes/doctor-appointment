import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

jest.setTimeout(30000); // Increase timeout to 30 seconds

beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error("Error in test setup:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (error) {
    console.error("Error in test teardown:", error);
    throw error;
  }
});

afterEach(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      const collections = await mongoose.connection.db.collections();
      for (const collection of collections) {
        await collection.deleteMany({});
      }
    }
  } catch (error) {
    console.error("Error cleaning up test database:", error);
    throw error;
  }
});
