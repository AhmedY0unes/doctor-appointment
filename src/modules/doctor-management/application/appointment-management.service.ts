import { DoctorAppointment } from "../domain/appointment.entity";
import { AppointmentRepositoryPort } from "../ports/outgoing/appointment.repository.port";
import { NotificationServicePort } from "../ports/outgoing/notification.service.port";

export class AppointmentManagementService {
  constructor(
    private readonly appointmentRepository: AppointmentRepositoryPort,
    private readonly notificationService: NotificationServicePort
  ) {
    if (!appointmentRepository) {
      throw new Error("AppointmentRepository is required");
    }
    if (!notificationService) {
      throw new Error("NotificationService is required");
    }
  }

  async getUpcomingAppointments(
    doctorId: string
  ): Promise<DoctorAppointment[]> {
    if (!this.appointmentRepository) {
      throw new Error("AppointmentRepository is not initialized");
    }
    return this.appointmentRepository.findUpcomingByDoctorId(doctorId);
  }

  async completeAppointment(id: string): Promise<DoctorAppointment | null> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      return null;
    }

    const updatedAppointment = await this.appointmentRepository.updateStatus(
      id,
      "completed"
    );

    if (updatedAppointment) {
      await this.notificationService.notifyAppointmentStatusChange(
        updatedAppointment
      );
    }

    return updatedAppointment;
  }

  async cancelAppointment(id: string): Promise<DoctorAppointment | null> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      return null;
    }

    const updatedAppointment = await this.appointmentRepository.updateStatus(
      id,
      "cancelled"
    );

    if (updatedAppointment) {
      await this.notificationService.notifyAppointmentStatusChange(
        updatedAppointment
      );
    }

    return updatedAppointment;
  }
}
