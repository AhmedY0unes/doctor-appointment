import { AppointmentEntity } from "../entities/appointment.entity";
import { IAppointmentRepository } from "../repositories/appointment.repository.interface";
import { NotificationService } from "../../../appointment-confirmation/notification.service";
import { SlotService } from "../../../doctor-availability/layers/business/slot.service";

export class CreateAppointmentUseCase {
  constructor(
    private readonly bookingAppointmentRepository: IAppointmentRepository,
    private readonly slotService: SlotService,
    private readonly notificationService: NotificationService
  ) {}

  async execute(
    data: Omit<
      AppointmentEntity,
      "id" | "createdAt" | "updatedAt" | "status" | "reservedAt"
    >
  ): Promise<AppointmentEntity | null> {
    // First, try to reserve the slot
    const slot = await this.slotService.reserveSlot(data.slotId);
    if (!slot) {
      return null;
    }
    // Create the appointment
    const appointment = await this.bookingAppointmentRepository.create({
      ...data,
      status: "scheduled",
      time: slot.time,
      reservedAt: new Date(),
    });

    // Send confirmation notification
    this.notificationService.sendConfirmation(appointment, slot);

    return appointment;
  }
}
