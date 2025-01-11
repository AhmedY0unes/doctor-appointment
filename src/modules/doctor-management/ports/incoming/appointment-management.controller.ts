import { Request, Response } from "express";
import { AppointmentManagementService } from "../../application/appointment-management.service";
import mongoose from "mongoose";

export class AppointmentManagementController {
  constructor(
    private readonly appointmentManagementService: AppointmentManagementService
  ) {}

  async getUpcomingAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments =
        await this.appointmentManagementService.getAppointmentsByDoctorId(
          req.params.doctorId
        );
      res.json(appointments);
    } catch (error) {
      console.error("Error getting upcoming appointments:", error);
      if (error instanceof mongoose.Error.CastError) {
        res.status(404).json({ message: "Doctor not found" });
        return;
      }
      res.status(500).json({
        message: "Failed to get upcoming appointments",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async completeAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment =
        await this.appointmentManagementService.completeAppointment(
          req.params.id
        );
      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.json(appointment);
    } catch (error) {
      console.error("Error completing appointment:", error);
      if (error instanceof mongoose.Error.CastError) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      if (error instanceof Error && error.message === "Appointment not found") {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.status(500).json({
        message: "Failed to complete appointment",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment =
        await this.appointmentManagementService.cancelAppointment(
          req.params.id
        );
      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.json(appointment);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      if (error instanceof mongoose.Error.CastError) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      if (error instanceof Error && error.message === "Appointment not found") {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.status(500).json({
        message: "Failed to cancel appointment",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
