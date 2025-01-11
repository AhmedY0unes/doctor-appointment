import { AppointmentEntity } from "../entities/appointment.entity";
import { IAppointmentRepository } from "../repositories/appointment.repository.interface";

export class GetAppointmentUseCase {
  constructor(
    private readonly bookingAppointmentRepository: IAppointmentRepository
  ) {}

  async execute(id: string): Promise<AppointmentEntity> {
    const appointment = await this.bookingAppointmentRepository.findById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return appointment;
  }
}
