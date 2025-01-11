import request from "supertest";
import { createTestApp } from "../../helpers/create-test-app";
import { SuperTestError } from "../../helpers/test-types";

const app = createTestApp();

describe("SlotController", () => {
  describe("POST /api/slots", () => {
    it("should create a new slot", async () => {
      const slotData = {
        doctorId: "doctor123",
        doctorName: "Dr. John Doe",
        time: new Date().toISOString(),
        duration: 30,
        cost: 100,
      };

      const response = await request(app)
        .post("/api/slots")
        .send(slotData)
        .expect(201);

      expect(response.body).toMatchObject({
        doctorId: slotData.doctorId,
        doctorName: slotData.doctorName,
        cost: slotData.cost,
        isReserved: false,
      });
      expect(response.body.id).toBeDefined();
    });
  });

  describe("GET /api/slots", () => {
    it("should return all slots", async () => {
      // First create a slot
      const slotData = {
        doctorId: "doctor123",
        doctorName: "Dr. John Doe",
        time: new Date().toISOString(),
        duration: 30,
        cost: 100,
      };

      await request(app).post("/api/slots").send(slotData);

      // Then get all slots
      const response = await request(app).get("/api/slots").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject({
        doctorId: slotData.doctorId,
        doctorName: slotData.doctorName,
        cost: slotData.cost,
        isReserved: false,
      });
    });
  });

  describe("PATCH /api/slots/:id/reserve", () => {
    it("should reserve a slot", async () => {
      // First create a slot
      const slotData = {
        doctorId: "doctor123",
        doctorName: "Dr. John Doe",
        time: new Date().toISOString(),
        duration: 30,
        cost: 100,
      };

      const createResponse = await request(app)
        .post("/api/slots")
        .send(slotData);

      // Then reserve it
      const response = await request(app)
        .patch(`/api/slots/${createResponse.body.id}/reserve`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createResponse.body.id,
        isReserved: true,
      });
    });

    it("should return 404 for non-existent slot", async () => {
      const response = await request(app)
        .patch("/api/slots/non-existent-id/reserve")
        .expect(404);

      expect(response.body).toMatchObject({
        message: "Slot not found or already reserved",
      });
    });
  });

  describe("DELETE /api/slots/:id", () => {
    it("should delete a slot", async () => {
      // First create a slot
      const slotData = {
        doctorId: "doctor123",
        doctorName: "Dr. John Doe",
        time: new Date().toISOString(),
        duration: 30,
        cost: 100,
      };

      const createResponse = await request(app)
        .post("/api/slots")
        .send(slotData);

      // Then delete it
      await request(app)
        .delete(`/api/slots/${createResponse.body.id}`)
        .expect(204); // Changed from 200 to 204 as it's more RESTful for deletes

      // Verify it's deleted
      await request(app)
        .get(`/api/slots/${createResponse.body.id}`)
        .expect(404);
    });
  });
});
