import { DoctorAppointment } from "../../domain/appointment.entity";
import { Appointment } from "../../../appointment-booking/domain/entities/appointment.entity";

export class AppointmentMapper {
  static toAppointment(doctorAppointment: DoctorAppointment): Appointment {
    return {
      id: doctorAppointment.id,
      slotId: doctorAppointment.slotId,
      patientId: doctorAppointment.patientId,
      patientName: doctorAppointment.patientName,
      doctorId: doctorAppointment.doctorId,
      status: doctorAppointment.status,
      reservedAt: doctorAppointment.scheduledAt, // map scheduledAt to reservedAt
      createdAt: doctorAppointment.createdAt,
      updatedAt: doctorAppointment.updatedAt,
      time: doctorAppointment.time,
    };
  }
}
