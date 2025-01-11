import { BaseEntity } from "../../../../shared/types";

export interface AppointmentEntity extends BaseEntity {
  slotId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  time: Date;
  status: "scheduled" | "completed" | "cancelled";
  reservedAt: Date;
}

export class Appointment implements AppointmentEntity {
  id!: string;
  slotId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  status: "scheduled" | "completed" | "cancelled";
  time: Date;
  reservedAt: Date;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Omit<AppointmentEntity, "id" | "createdAt" | "updatedAt">) {
    this.slotId = data.slotId;
    this.patientId = data.patientId;
    this.patientName = data.patientName;
    this.doctorId = data.doctorId;
    this.status = data.status;
    this.reservedAt = data.reservedAt;
    this.time = data.time;
  }
}
