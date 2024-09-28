import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { validateRequest } from "@/common/utils/httpHandlers";
import {
  AppointmentSchema,
  CreateAppointmentSchema,
  GetAppointmentByEmailSchema,
  GetAppointmentsByDoctorSchema,
  CancelAppointmentSchema,
  ModifyAppointmentSchema,
} from "./appointmentModel";
import { appointmentController } from "./appointmentController";

// Define the OpenAPI registry for appointment routes
export const appointmentRegistry = new OpenAPIRegistry();

// Define the appointment router
export const appointmentRouter: Router = express.Router();

// Register Appointment schema
appointmentRegistry.register("Appointment", AppointmentSchema);

// 1. Book an appointment
appointmentRegistry.registerPath({
  method: "post",
  path: "/appointments/book",
  tags: ["Appointment"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateAppointmentSchema,
        },
      },
    },
  },
  responses: createApiResponse(
    AppointmentSchema,
    "Appointment created successfully"
  ),
});

appointmentRouter.post(
  "/book",
  validateRequest(CreateAppointmentSchema), // Request validation middleware
  appointmentController.bookAppointment // Controller function handling booking logic
);

// 2. View appointment details by patient's email
appointmentRegistry.registerPath({
  method: "get",
  path: "/appointments/details/{email}",
  tags: ["Appointment"],
  request: { params: GetAppointmentByEmailSchema.shape.params },
  responses: createApiResponse(
    AppointmentSchema,
    "Appointment details retrieved successfully"
  ),
});
appointmentRouter.get(
  "/details/:email",
  validateRequest(GetAppointmentByEmailSchema),
  appointmentController.getAppointmentByEmail
);

// 3. View all appointments by doctor
appointmentRegistry.registerPath({
  method: "get",
  path: "/appointments/doctor/{doctorName}",
  tags: ["Appointment"],
  request: { params: GetAppointmentsByDoctorSchema.shape.params },
  responses: createApiResponse(
    z.array(AppointmentSchema),
    "Appointments retrieved successfully"
  ),
});
appointmentRouter.get(
  "/doctor/:doctorName",
  validateRequest(GetAppointmentsByDoctorSchema),
  appointmentController.getAppointmentsByDoctor
);

// 4. Cancel an appointment
appointmentRegistry.registerPath({
  method: "delete",
  path: "/appointments/cancel",
  tags: ["Appointment"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CancelAppointmentSchema,
        },
      },
    },
  },
  responses: createApiResponse(
    z.object({ message: z.string() }),
    "Appointment cancelled successfully"
  ),
});

appointmentRouter.delete(
  "/cancel",
  validateRequest(CancelAppointmentSchema),
  appointmentController.cancelAppointment
);

// 5. Modify an appointment
appointmentRegistry.registerPath({
  method: "put",
  path: "/appointments/modify",
  tags: ["Appointment"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: ModifyAppointmentSchema,
        },
      },
    },
  },
  responses: createApiResponse(
    AppointmentSchema,
    "Appointment modified successfully"
  ),
});
appointmentRouter.put(
  "/modify",
  validateRequest(ModifyAppointmentSchema),
  appointmentController.modifyAppointment
);
