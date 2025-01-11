import cuid from "cuid";
import { BaseRepository } from "../../../../shared/types";
import { Slot, SlotModel } from "../../models/slot.model";

export class SlotRepository implements BaseRepository<Slot> {
  async create(
    data: Omit<Slot, "id" | "createdAt" | "updatedAt">
  ): Promise<Slot> {
    const slot = await SlotModel.create({
      _id: cuid(),
      ...data,
    });
    return slot.toJSON();
  }

  async findById(id: string): Promise<Slot | null> {
    const slot = await SlotModel.findById(id);
    return slot ? slot.toJSON() : null;
  }

  async findAll(): Promise<Slot[]> {
    const slots = await SlotModel.find();
    return slots.map((slot) => slot.toJSON());
  }

  async update(id: string, data: Partial<Slot>): Promise<Slot | null> {
    const slot = await SlotModel.findByIdAndUpdate(id, data, { new: true });
    return slot ? slot.toJSON() : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await SlotModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
