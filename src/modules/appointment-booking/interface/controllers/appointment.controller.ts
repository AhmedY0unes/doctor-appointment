import { Request, Response } from "express";
import { CreateAppointmentUseCase } from "../../domain/usecases/create-appointment.usecase";
import { GetAppointmentUseCase } from "../../domain/usecases/get-appointment.usecase";

export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getAppointmentUseCase: GetAppointmentUseCase
  ) {}

  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);
      const appointment = await this.createAppointmentUseCase.execute(req.body);
      if (!appointment) {
        res.status(400).json({
          message: "Failed to create appointment. Slot may be unavailable.",
        });
        return;
      }
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Failed to create appointment", error });
    }
  }

  async getAppointmentById(req: Request, res: Response): Promise<void> {
    try {
      const appointment = await this.getAppointmentUseCase.execute(
        req.params.id
      );
      if (!appointment) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.json(appointment);
    } catch (error) {
      if (error instanceof Error && error.message === "Appointment not found") {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.status(500).json({ message: "Failed to get appointment", error });
    }
  }
}
