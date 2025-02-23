import { Request, Response } from "express";
import { AppointmentManagementService } from "../services/appointment-management.service";

export class AppointmentManagementController {
  constructor(
    private readonly appointmentManagementService: AppointmentManagementService
  ) {}

  async getUpcomingAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments =
        await this.appointmentManagementService.getUpcomingAppointments(
          req.params.doctorId
        );
      res.json(appointments);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get upcoming appointments", error });
    }
  }

  async completeAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment =
        await this.appointmentManagementService.completeAppointment(
          req.params.id
        );
      if (!appointment) {
        res
          .status(404)
          .json({ message: "Appointment not found or not scheduled" });
        return;
      }
      res.json(appointment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to complete appointment", error });
    }
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointment =
        await this.appointmentManagementService.cancelAppointment(
          req.params.id
        );
      if (!appointment) {
        res
          .status(404)
          .json({ message: "Appointment not found or not scheduled" });
        return;
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel appointment", error });
    }
  }
}
