import { Application, Router } from "express";
import { AwilixContainer } from "awilix";
import { ContainerDependencies } from "./config/container";

export function registerRoutes(
  app: Application,
  container: AwilixContainer<ContainerDependencies>
) {
  const router = Router();

  // Doctor Availability Routes
  const slotController = container.cradle.slotController;
  router.get("/slots", (req, res) => slotController.getAllSlots(req, res));
  router.post("/slots", (req, res) => slotController.createSlot(req, res));
  router.get("/slots/:id", (req, res) => slotController.getSlotById(req, res));
  router.patch("/slots/:id/reserve", (req, res) =>
    slotController.reserveSlot(req, res)
  );
  router.delete("/slots/:id", (req, res) =>
    slotController.deleteSlot(req, res)
  );

  // Appointment Booking Routes
  const appointmentController = container.cradle.appointmentController;
  router.post("/appointments", (req, res) =>
    appointmentController.createAppointment(req, res)
  );
  router.get("/appointments/:id", (req, res) =>
    appointmentController.getAppointmentById(req, res)
  );

  // Doctor Management Routes
  const appointmentManagementController =
    container.cradle.appointmentManagementController;
  router.get("/doctor-management/appointments/upcoming/:doctorId", (req, res) =>
    appointmentManagementController.getUpcomingAppointments(req, res)
  );
  router.post("/doctor-management/appointments/:id/complete", (req, res) =>
    appointmentManagementController.completeAppointment(req, res)
  );
  router.post("/doctor-management/appointments/:id/cancel", (req, res) =>
    appointmentManagementController.cancelAppointment(req, res)
  );

  return router;
}
