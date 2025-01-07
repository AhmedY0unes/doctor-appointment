import { Request, Response } from "express";
import { SlotService } from "../business/slot.service";

export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  async createSlot(req: Request, res: Response): Promise<void> {
    try {
      const slot = await this.slotService.createSlot(req.body);
      res.status(201).json(slot);
    } catch (error) {
      res.status(400).json({ message: "Failed to create slot", error });
    }
  }

  async getAllSlots(req: Request, res: Response): Promise<void> {
    try {
      const slots = await this.slotService.getAllSlots();
      res.json(slots);
    } catch (error) {
      res.status(500).json({ message: "Failed to get slots", error });
    }
  }

  async getSlotById(req: Request, res: Response): Promise<void> {
    try {
      const slot = await this.slotService.getSlotById(req.params.id);
      if (!slot) {
        res.status(404).json({ message: "Slot not found" });
        return;
      }
      res.json(slot);
    } catch (error) {
      res.status(500).json({ message: "Failed to get slot", error });
    }
  }

  async reserveSlot(req: Request, res: Response): Promise<void> {
    try {
      const slot = await this.slotService.reserveSlot(req.params.id);
      if (!slot) {
        res.status(404).json({ message: "Slot not found or already reserved" });
        return;
      }
      res.json(slot);
    } catch (error) {
      res.status(500).json({ message: "Failed to reserve slot", error });
    }
  }

  async deleteSlot(req: Request, res: Response): Promise<void> {
    try {
      const success = await this.slotService.deleteSlot(req.params.id);
      if (!success) {
        res.status(404).json({ message: "Slot not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete slot", error });
    }
  }
}
