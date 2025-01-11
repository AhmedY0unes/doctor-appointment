import { IAppointmentRepository } from "../../domain/repositories/appointment.repository.interface";
import { AppointmentEntity } from "../../domain/entities/appointment.entity";
import {
  AppointmentModel,
  AppointmentDocument,
} from "../../../../shared/models/appointment.model";
import cuid from "cuid";

export class MongoAppointmentRepository implements IAppointmentRepository {
  async create(
    data: Omit<AppointmentEntity, "id" | "createdAt" | "updatedAt">
  ): Promise<AppointmentEntity> {
    const appointment = await AppointmentModel.create({
      _id: cuid(),
      ...data,
    });
    return appointment.toJSON();
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    const appointment = await AppointmentModel.findById(id);
    return appointment ? appointment.toJSON() : null;
  }

  async findAll(): Promise<AppointmentEntity[]> {
    const appointments = await AppointmentModel.find();
    return appointments.map((appointment: AppointmentDocument) =>
      appointment.toJSON()
    );
  }

  async update(
    id: string,
    data: Partial<AppointmentEntity>
  ): Promise<AppointmentEntity | null> {
    const appointment = await AppointmentModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return appointment ? appointment.toJSON() : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await AppointmentModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  async findUpcomingByDoctorId(doctorId: string): Promise<AppointmentEntity[]> {
    const appointments = await AppointmentModel.find({
      doctorId,
      status: "scheduled",
    }).sort({ scheduledAt: 1 });
    return appointments.map((appointment: AppointmentDocument) =>
      appointment.toJSON()
    );
  }
}
