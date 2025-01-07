import { Appointment } from "../appointment-booking/domain/entities/appointment.entity";
import { Slot } from "../doctor-availability/models/slot.model";

export class NotificationService {
  sendConfirmation(appointment: Appointment, slot: Slot): void {
    console.log(`
      ===== Appointment Confirmation =====
      Patient: ${appointment.patientName}
      Doctor: ${slot.doctorName}
      Date: ${slot.time}
      Cost: $${slot.cost}
      Status: ${appointment.status}
      ================================
    `);
  }

  sendStatusUpdate(appointment: Appointment): void {
    console.log(`
      ===== Appointment Status Update =====
      Patient: ${appointment.patientName}
      Appointment ID: ${appointment.id}
      New Status: ${appointment.status}
      ================================
    `);
  }
}
