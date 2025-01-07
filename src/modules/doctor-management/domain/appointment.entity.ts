export interface DoctorAppointment {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  slotId: string;
  status: "scheduled" | "completed" | "cancelled";
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class DoctorAppointmentEntity implements DoctorAppointment {
  id!: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  slotId: string;
  status: "scheduled" | "completed" | "cancelled";
  scheduledAt: Date;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Omit<DoctorAppointment, "id" | "createdAt" | "updatedAt">) {
    this.doctorId = data.doctorId;
    this.patientId = data.patientId;
    this.patientName = data.patientName;
    this.slotId = data.slotId;
    this.status = data.status;
    this.scheduledAt = data.scheduledAt;
  }

  complete(): void {
    if (this.status !== "scheduled") {
      throw new Error("Cannot complete a non-scheduled appointment");
    }
    this.status = "completed";
  }

  cancel(): void {
    if (this.status !== "scheduled") {
      throw new Error("Cannot cancel a non-scheduled appointment");
    }
    this.status = "cancelled";
  }

  isUpcoming(): boolean {
    return this.status === "scheduled" && this.scheduledAt > new Date();
  }
}
