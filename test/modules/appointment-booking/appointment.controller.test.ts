import request from "supertest";
import { createTestApp } from "../../helpers/create-test-app";
import { SuperTestError } from "../../helpers/test-types";
import "@jest/globals";
import cuid from "cuid";

const app = createTestApp();

describe("AppointmentController", () => {
  let slotId: string;

  beforeEach(async () => {
    // Create a slot first
    const slotData = {
      doctorId: "doctor123",
      doctorName: "Dr. John Doe",
      time: new Date().toISOString(),
      duration: 30,
      cost: 100,
    };

    const response = await request(app).post("/api/slots").send(slotData);
    slotId = response.body.id;
  });

  describe("POST /api/appointments", () => {
    it("should create a new appointment", async () => {
      console.log(slotId);
      const appointmentData = {
        doctorId: "doctor123",
        patientId: "patient123",
        patientName: "John Smith",
        slotId,
      };

      const response = await request(app)
        .post("/api/appointments")
        .send(appointmentData)
        .expect(201);

      expect(response.body).toMatchObject({
        doctorId: appointmentData.doctorId,
        patientId: appointmentData.patientId,
        patientName: appointmentData.patientName,
        slotId: appointmentData.slotId,
        status: "scheduled",
      });
      expect(response.body.id).toBeDefined();
    });

    it("should return 400 if slot is already reserved", async () => {
      console.log(slotId);
      const appointmentData = {
        doctorId: "doctor123",
        patientId: "patient123",
        patientName: "John Smith",
        slotId,
      };

      // Create first appointment
      await request(app).post("/api/appointments").send(appointmentData);

      // Try to create second appointment with same slot
      await request(app)
        .post("/api/appointments")
        .send(appointmentData)
        .expect(400);
    });
  });

  describe("GET /api/appointments/:id", () => {
    it("should return an appointment by id", async () => {
      console.log(slotId);
      const appointmentData = {
        doctorId: "doctor123",
        patientId: "patient123",
        patientName: "John Smith",
        slotId,
      };

      const createResponse = await request(app)
        .post("/api/appointments")
        .send(appointmentData);

      const response = await request(app)
        .get(`/api/appointments/${createResponse.body.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createResponse.body.id,
        doctorId: appointmentData.doctorId,
        patientId: appointmentData.patientId,
        patientName: appointmentData.patientName,
        slotId: appointmentData.slotId,
        status: "scheduled",
      });
    });

    it("should return 404 for non-existent appointment", async () => {
      const response = await request(app)
        .get(`/api/appointments/${cuid()}`)
        .expect(404);

      expect(response.body).toMatchObject({
        message: "Appointment not found",
      });
    });
  });
});
