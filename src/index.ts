import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { connectDB } from "./config/database";
import { createDIContainer } from "./config/container";
import { registerRoutes } from "./routes";

async function bootstrap() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Database connection
  await connectDB();

  // Dependency Injection
  const container = createDIContainer(app);

  // Routes
  app.use("/api", registerRoutes(app, container));

  // Start server
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
