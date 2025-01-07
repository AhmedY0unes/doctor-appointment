import { DoctorAppointment } from "../../domain/appointment.entity";

export interface NotificationServicePort {
  notifyAppointmentStatusChange(appointment: DoctorAppointment): Promise<void>;
}
