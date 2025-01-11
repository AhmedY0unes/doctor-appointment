import { AppointmentRepositoryPort } from "../../ports/outgoing/appointment.repository.port";
import { DoctorAppointment } from "../../domain/appointment.entity";
import { AppointmentModel } from "../../../../shared/models/appointment.model";

export class DoctorMongoAppointmentRepository
  implements AppointmentRepositoryPort
{
  async findById(id: string): Promise<DoctorAppointment | null> {
    const appointment = await AppointmentModel.findById(id);
    return appointment ? appointment.toJSON() : null;
  }

  async findUpcomingByDoctorId(doctorId: string): Promise<DoctorAppointment[]> {
    const appointments = await AppointmentModel.find({
      doctorId,
      status: "scheduled",
      time: { $gte: new Date() },
    }).sort({ time: 1 });

    return appointments.map((appointment) => appointment.toJSON());
  }

  async updateStatus(
    id: string,
    status: DoctorAppointment["status"]
  ): Promise<DoctorAppointment | null> {
    const appointment = await AppointmentModel.findByIdAndUpdate(
      id,
      { $set: { status, updatedAt: new Date() } },
      { new: true }
    );
    return appointment ? appointment.toJSON() : null;
  }
}
