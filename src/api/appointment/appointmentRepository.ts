import { Appointment } from "./appointmentModel";

export const appointments: Appointment[] = [];

export class AppointmentRepository {
  async createAppointment(appointment: Appointment): Promise<Appointment> {
    appointments.push(appointment);
    return appointment;
  }

  async findByEmail(email: string): Promise<Appointment | null> {
    return (
      appointments.find((appointment) => appointment.email === email) || null
    );
  }

  async findByDoctorName(doctorName: string): Promise<Appointment[]> {
    return appointments.filter(
      (appointment) => appointment.doctorName === doctorName
    );
  }

  async cancelAppointment(email: string, timeSlot: string): Promise<boolean> {
    const index = appointments.findIndex(
      (appointment) =>
        appointment.email === email && appointment.timeSlot === timeSlot
    );
    if (index !== -1) {
      appointments.splice(index, 1);
      return true;
    }
    return false;
  }

  async modifyAppointment(
    email: string,
    originalTimeSlot: string,
    newTimeSlot: string
  ): Promise<Appointment | null> {
    const appointment = appointments.find(
      (appointment) =>
        appointment.email === email && appointment.timeSlot === originalTimeSlot
    );
    if (appointment) {
      appointment.timeSlot = newTimeSlot;
      return appointment;
    }
    return null;
  }
}
