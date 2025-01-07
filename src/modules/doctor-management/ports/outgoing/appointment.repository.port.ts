import { DoctorAppointment } from "../../domain/appointment.entity";

export interface AppointmentRepositoryPort {
  findById(id: string): Promise<DoctorAppointment | null>;
  findUpcomingByDoctorId(doctorId: string): Promise<DoctorAppointment[]>;
  updateStatus(
    id: string,
    status: DoctorAppointment["status"]
  ): Promise<DoctorAppointment | null>;
}
