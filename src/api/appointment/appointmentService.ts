import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { AppointmentRepository } from "./appointmentRepository";
import { Appointment } from "./appointmentModel";

export class AppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(repository: AppointmentRepository = new AppointmentRepository()) {
    this.appointmentRepository = repository;
  }

  async bookAppointment(
    appointmentData: Appointment
  ): Promise<ServiceResponse<Appointment | null>> {
    try {
      const appointment = await this.appointmentRepository.createAppointment(
        appointmentData
      );
      return ServiceResponse.success(
        "Appointment booked successfully",
        appointment
      );
    } catch (error) {
      logger.error(`Error booking appointment: ${(error as Error).message}`);
      return ServiceResponse.failure(
        "An error occurred while booking the appointment.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAppointmentByEmail(
    email: string
  ): Promise<ServiceResponse<Appointment | null>> {
    const appointment = await this.appointmentRepository.findByEmail(email);
    if (!appointment) {
      return ServiceResponse.failure(
        "No appointment found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return ServiceResponse.success("Appointment found", appointment);
  }

  async getAppointmentsByDoctor(
    doctorName: string
  ): Promise<ServiceResponse<Appointment[]>> {
    const appointments = await this.appointmentRepository.findByDoctorName(
      doctorName
    );
    return ServiceResponse.success("Appointments found", appointments);
  }

  async cancelAppointment(
    email: string,
    timeSlot: string
  ): Promise<ServiceResponse<null>> {
    const success = await this.appointmentRepository.cancelAppointment(
      email,
      timeSlot
    );
    if (success) {
      return ServiceResponse.success(
        "Appointment cancelled successfully",
        null
      );
    } else {
      return ServiceResponse.failure(
        "Appointment not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
  }

  async modifyAppointment(
    email: string,
    originalTimeSlot: string,
    newTimeSlot: string
  ): Promise<ServiceResponse<Appointment | null>> {
    const updatedAppointment =
      await this.appointmentRepository.modifyAppointment(
        email,
        originalTimeSlot,
        newTimeSlot
      );
    if (!updatedAppointment) {
      return ServiceResponse.failure(
        "Appointment not found or modification failed",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return ServiceResponse.success(
      "Appointment modified successfully",
      updatedAppointment
    );
  }
}

export const appointmentService = new AppointmentService();
