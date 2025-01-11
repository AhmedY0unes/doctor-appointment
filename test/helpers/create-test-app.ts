import express, { Application } from "express";
import { createDIContainer } from "../../src/config/container";
import { registerRoutes } from "../../src/routes";

export function createTestApp(): Application {
  const app = express();
  app.use(express.json());
  
  const container = createDIContainer(app);
  const router = registerRoutes(app, container);
  app.use("/api", router);
  
  return app;
}
