import request from "supertest";
import { createTestApp } from "../../helpers/create-test-app";
import { SuperTestError } from "../../helpers/test-types";
import "@jest/globals";
import { faker } from "@faker-js/faker";
const app = createTestApp();

describe("AppointmentManagementController", () => {
  let appointmentId: string;
  const doctorId = "doctor123";

  beforeEach(async () => {
    // Create a slot first
    const slotData = {
      doctorId,
      doctorName: "Dr. John Doe",
      time: faker.date.future().toISOString(),
      duration: 30,
      cost: 100,
    };

    const slotResponse = await request(app).post("/api/slots").send(slotData);
    // Create an appointment
    const appointmentData = {
      doctorId,
      patientId: "patient123",
      patientName: "John Smith",
      slotId: slotResponse.body.id,
    };

    const appointmentResponse = await request(app)
      .post("/api/appointments")
      .send(appointmentData);
    appointmentId = appointmentResponse.body.id;
  });

  describe("GET /api/doctor-management/appointments/upcoming/:doctorId", () => {
    it("should return upcoming appointments for a doctor", async () => {
      const response = await request(app)
        .get(`/api/doctor-management/appointments/upcoming/${doctorId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject({
        doctorId,
        status: "scheduled",
      });
    });

    it("should return empty array for doctor with no appointments", async () => {
      const response = await request(app)
        .get("/api/doctor-management/appointments/upcoming/non-existent-doctor")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });
  });

  describe("POST /api/doctor-management/appointments/:id/complete", () => {
    it("should complete an appointment", async () => {
      const response = await request(app)
        .post(`/api/doctor-management/appointments/${appointmentId}/complete`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: appointmentId,
        status: "completed",
      });
    });

    it("should return 404 for non-existent appointment", async () => {
      const nonExistentId = "non-existent-id";
      const response = await request(app)
        .post(`/api/doctor-management/appointments/${nonExistentId}/complete`)
        .expect(404);

      expect(response.body).toMatchObject({
        message: "Appointment not found",
      });
    });
  });

  describe("POST /api/doctor-management/appointments/:id/cancel", () => {
    it("should cancel an appointment", async () => {
      const response = await request(app)
        .post(`/api/doctor-management/appointments/${appointmentId}/cancel`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: appointmentId,
        status: "cancelled",
      });
    });

    it("should return 404 for non-existent appointment", async () => {
      const nonExistentId = "non-existent-id";
      const response = await request(app)
        .post(`/api/doctor-management/appointments/${nonExistentId}/cancel`)
        .expect(404);

      expect(response.body).toMatchObject({
        message: "Appointment not found",
      });
    });
  });
});
