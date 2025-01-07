import { SlotRepository } from "../data/slot.repository";
import { Slot } from "../../models/slot.model";

export class SlotService {
  constructor(private readonly slotRepository: SlotRepository) {}

  async createSlot(
    data: Omit<Slot, "id" | "createdAt" | "updatedAt" | "isReserved">
  ): Promise<Slot> {
    return this.slotRepository.create({ ...data, isReserved: false });
  }

  async getAllSlots(): Promise<Slot[]> {
    return this.slotRepository.findAll();
  }

  async getSlotById(id: string): Promise<Slot | null> {
    return this.slotRepository.findById(id);
  }

  async reserveSlot(id: string): Promise<Slot | null> {
    const slot = await this.slotRepository.findById(id);
    if (!slot || slot.isReserved) {
      return null;
    }
    return this.slotRepository.update(id, { isReserved: true });
  }

  async deleteSlot(id: string): Promise<boolean> {
    return this.slotRepository.delete(id);
  }
}
