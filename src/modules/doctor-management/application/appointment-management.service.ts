import { AppointmentRepositoryPort } from "../ports/outgoing/appointment.repository.port";
import { NotificationServicePort } from "../ports/outgoing/notification.service.port";
import { DoctorAppointment } from "../domain/appointment.entity";

export class AppointmentManagementService {
  constructor(
    private readonly doctorAppointmentRepository: AppointmentRepositoryPort,
    private readonly notificationServiceAdapter: NotificationServicePort
  ) {
    if (!doctorAppointmentRepository) {
      throw new Error("AppointmentRepository is required");
    }
    if (!notificationServiceAdapter) {
      throw new Error("NotificationService is required");
    }
  }

  async getAppointmentsByDoctorId(
    doctorId: string
  ): Promise<DoctorAppointment[]> {
    console.log("doctorId", doctorId);
    return this.doctorAppointmentRepository.findUpcomingByDoctorId(doctorId);
  }

  async completeAppointment(id: string): Promise<DoctorAppointment | null> {
    const appointment = await this.doctorAppointmentRepository.updateStatus(
      id,
      "completed"
    );
    if (appointment) {
      await this.notificationServiceAdapter.notifyAppointmentStatusChange(
        appointment
      );
    }
    return appointment;
  }

  async cancelAppointment(id: string): Promise<DoctorAppointment | null> {
    const appointment = await this.doctorAppointmentRepository.updateStatus(
      id,
      "cancelled"
    );
    if (appointment) {
      await this.notificationServiceAdapter.notifyAppointmentStatusChange(
        appointment
      );
    }
    return appointment;
  }
}
