import { AppointmentRepositoryPort } from "../../ports/outgoing/appointment.repository.port";
import { DoctorAppointment } from "../../domain/appointment.entity";
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    id: String,
    slotId: { type: String, required: true },
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: String, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    scheduledAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const DoctorAppointmentModel = mongoose.model(
  "DoctorAppointment",
  appointmentSchema
);

export class MongoAppointmentRepository implements AppointmentRepositoryPort {
  async findById(id: string): Promise<DoctorAppointment | null> {
    const appointment = await DoctorAppointmentModel.findById(id);
    return appointment ? appointment.toJSON() : null;
  }

  async findUpcomingByDoctorId(doctorId: string): Promise<DoctorAppointment[]> {
    const appointments = await DoctorAppointmentModel.find({
      doctorId,
      status: "scheduled",
      scheduledAt: { $gte: new Date() },
    }).sort({ scheduledAt: 1 });

    return appointments.map((appointment) => appointment.toJSON());
  }

  async updateStatus(
    id: string,
    status: DoctorAppointment["status"]
  ): Promise<DoctorAppointment | null> {
    const appointment = await DoctorAppointmentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    return appointment ? appointment.toJSON() : null;
  }
}
