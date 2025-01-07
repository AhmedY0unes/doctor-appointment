import {
  AwilixContainer,
  createContainer,
  asClass,
  InjectionMode,
  asValue,
} from "awilix";
import { Application } from "express";
import mongoose from "mongoose";

// Doctor Availability (Layered Architecture)
import { SlotController } from "../modules/doctor-availability/layers/presentation/slot.controller";
import { SlotService } from "../modules/doctor-availability/layers/business/slot.service";
import { SlotRepository } from "../modules/doctor-availability/layers/data/slot.repository";

// Appointment Booking (Clean Architecture)
import { AppointmentController } from "../modules/appointment-booking/interface/controllers/appointment.controller";
import { CreateAppointmentUseCase } from "../modules/appointment-booking/domain/usecases/create-appointment.usecase";
import { GetAppointmentUseCase } from "../modules/appointment-booking/domain/usecases/get-appointment.usecase";
import { MongoAppointmentRepository } from "../modules/appointment-booking/infrastructure/persistence/mongo-appointment.repository";

// Appointment Confirmation (Simple Architecture)
import { NotificationService } from "../modules/appointment-confirmation/notification.service";

// Doctor Management (Hexagonal Architecture)
import { AppointmentManagementController } from "../modules/doctor-management/ports/incoming/appointment-management.controller";
import { AppointmentManagementService } from "../modules/doctor-management/application/appointment-management.service";
import { MongoAppointmentRepository as DoctorMongoAppointmentRepository } from "../modules/doctor-management/infrastructure/persistence/mongo-appointment.repository";
import { NotificationServiceAdapter } from "../modules/doctor-management/infrastructure/adapters/notification.service.adapter";

export interface ContainerDependencies {
  // Core
  app: Application;
  mongoose: typeof mongoose;

  // Doctor Availability (Layered)
  slotController: SlotController;
  slotService: SlotService;
  slotRepository: SlotRepository;

  // Appointment Booking (Clean)
  appointmentController: AppointmentController;
  createAppointmentUseCase: CreateAppointmentUseCase;
  getAppointmentUseCase: GetAppointmentUseCase;
  appointmentRepository: MongoAppointmentRepository;

  // Appointment Confirmation (Simple)
  notificationService: NotificationService;

  // Doctor Management (Hexagonal)
  appointmentManagementController: AppointmentManagementController;
  appointmentManagementService: AppointmentManagementService;
  doctorAppointmentRepository: DoctorMongoAppointmentRepository;
  notificationServiceAdapter: NotificationServiceAdapter;
}

export function createDIContainer(
  app: Application
): AwilixContainer<ContainerDependencies> {
  const container = createContainer<ContainerDependencies>({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.register({
    // Core dependencies
    app: asValue(app),
    mongoose: asValue(mongoose),

    // Doctor Availability (Layered)
    slotController: asClass(SlotController).singleton(),
    slotService: asClass(SlotService).singleton(),
    slotRepository: asClass(SlotRepository).singleton(),

    // Appointment Booking (Clean)
    appointmentController: asClass(AppointmentController).singleton(),
    createAppointmentUseCase: asClass(CreateAppointmentUseCase).singleton(),
    getAppointmentUseCase: asClass(GetAppointmentUseCase).singleton(),
    appointmentRepository: asClass(MongoAppointmentRepository).singleton(),

    // Appointment Confirmation (Simple)
    notificationService: asClass(NotificationService).singleton(),

    // Doctor Management (Hexagonal)
    appointmentManagementController: asClass(
      AppointmentManagementController
    ).singleton(),
    appointmentManagementService: asClass(
      AppointmentManagementService
    ).singleton(),
    doctorAppointmentRepository: asClass(
      DoctorMongoAppointmentRepository
    ).singleton(),
    notificationServiceAdapter: asClass(NotificationServiceAdapter).singleton(),
  });

  return container;
}
