import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Appointment } from "./appointmentModel";
import { appointmentService } from "./appointmentService";

export class AppointmentController {
  async bookAppointment(req: Request, res: Response): Promise<void> {
    console.log("inside bookkkkk");
    const appointmentData: Appointment = req.body;
    const result = await appointmentService.bookAppointment(appointmentData);
    res.status(result.statusCode).json(result);
  }

  async getAppointmentByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    const result = await appointmentService.getAppointmentByEmail(email);
    res.status(result.statusCode).json(result);
  }

  async getAppointmentsByDoctor(req: Request, res: Response): Promise<void> {
    const { doctorName } = req.params;
    const result = await appointmentService.getAppointmentsByDoctor(doctorName);
    res.status(result.statusCode).json(result);
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    const { email, timeSlot } = req.body;
    const result = await appointmentService.cancelAppointment(email, timeSlot);
    res.status(result.statusCode).json(result);
  }

  async modifyAppointment(req: Request, res: Response): Promise<void> {
    const { email, originalTimeSlot, newTimeSlot } = req.body;
    const result = await appointmentService.modifyAppointment(
      email,
      originalTimeSlot,
      newTimeSlot
    );
    res.status(result.statusCode).json(result);
  }
}

export const appointmentController = new AppointmentController();
