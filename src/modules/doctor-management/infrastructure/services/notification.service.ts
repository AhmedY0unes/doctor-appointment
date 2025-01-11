import { DoctorAppointment } from "../../domain/appointment.entity";
import { NotificationServicePort } from "../../ports/outgoing/notification.service.port";

export class NotificationService implements NotificationServicePort {
  async notifyAppointmentStatusChange(
    appointment: DoctorAppointment
  ): Promise<void> {
    // In a real application, this would send an email or push notification
    console.log(
      `Appointment status changed to ${appointment.status} for appointment ${appointment.id}`
    );
  }
}
