import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema<AppointmentDocument>(
  {
    _id: { type: String, required: true },
    slotId: { type: String, required: true },
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: String, required: true },
    time: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    scheduledAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

export interface AppointmentDocument extends mongoose.Document {
  id: string;
  slotId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  time: Date;
  status: "scheduled" | "completed" | "cancelled";
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<AppointmentDocument>("Appointment", appointmentSchema);
