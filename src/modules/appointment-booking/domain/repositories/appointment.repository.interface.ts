import { BaseRepository } from "../../../../shared/types";
import { AppointmentEntity } from "../entities/appointment.entity";

export interface IAppointmentRepository extends BaseRepository<AppointmentEntity> {
  findUpcomingByDoctorId(doctorId: string): Promise<AppointmentEntity[]>;
}
