import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type Appointment = z.infer<typeof AppointmentSchema>;

export const AppointmentSchema = z.object({
  id: z.number(),
  doctorName: z.string(),
  patientFirstName: z.string(),
  patientLastName: z.string(),
  email: z.string().email(),
  timeSlot: z.string(), // e.g., "10:00 AM - 11:00 AM"
});

export const CreateAppointmentSchema = z.object({
  body: z.object({
    patientFirstName: z.string(),
    patientLastName: z.string(),
    email: z.string().email(),
    timeSlot: z.string(),
    doctorName: z.string(),
  }),
});

export const GetAppointmentByEmailSchema = z.object({
  params: z.object({ email: z.string().email() }),
});

export const GetAppointmentsByDoctorSchema = z.object({
  params: z.object({ doctorName: z.string() }),
});

export const CancelAppointmentSchema = z.object({
  body: z.object({
    email: z.string().email(),
    timeSlot: z.string(),
  }),
});

export const ModifyAppointmentSchema = z.object({
  body: z.object({
    email: z.string().email(),
    originalTimeSlot: z.string(),
    newTimeSlot: z.string(),
  }),
});
