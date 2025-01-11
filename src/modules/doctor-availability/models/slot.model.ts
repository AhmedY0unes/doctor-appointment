import mongoose from "mongoose";
import { BaseEntity } from "../../../shared/types";

export interface Slot extends BaseEntity {
  time: Date;
  doctorId: string;
  doctorName: string;
  isReserved: boolean;
  cost: number;
}

const slotSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    time: { type: Date, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    isReserved: { type: Boolean, default: false },
    cost: { type: Number, required: true },
  },
  {
    _id: false,
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

export const SlotModel = mongoose.model<Slot>("Slot", slotSchema);
