import { NotificationServicePort } from "../../ports/outgoing/notification.service.port";
import { DoctorAppointment } from "../../domain/appointment.entity";
import { NotificationService } from "../../../appointment-confirmation/notification.service";
import { AppointmentMapper } from "./appointment.mapper";

export class NotificationServiceAdapter implements NotificationServicePort {
  constructor(private readonly notificationService: NotificationService) {}

  async notifyAppointmentStatusChange(
    appointment: DoctorAppointment
  ): Promise<void> {
    await this.notificationService.sendStatusUpdate(
      AppointmentMapper.toAppointment(appointment)
    );
  }
}
