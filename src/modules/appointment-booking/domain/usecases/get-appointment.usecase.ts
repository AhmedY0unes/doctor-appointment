import { AppointmentEntity } from "../entities/appointment.entity";
import { IAppointmentRepository } from "../repositories/appointment.repository.interface";

export class GetAppointmentUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(id: string): Promise<AppointmentEntity | null> {
    return this.appointmentRepository.findById(id);
  }
}
