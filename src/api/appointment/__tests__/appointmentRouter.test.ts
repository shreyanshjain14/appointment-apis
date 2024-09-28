import { app } from "@/server";
import request from "supertest";

describe("Doctor Appointment Booking", () => {
  it("should book an appointment", async () => {
    const res = await request(app).post("/appointments/book").send({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      timeSlot: "10:00 AM - 11:00 AM",
      doctorName: "Dr. Smith",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("firstName", "John");
  });
});
