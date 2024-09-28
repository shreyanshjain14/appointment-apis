# Appointment Booking API

This is an API for managing appointment bookings between patients and doctors. Patients can book, view, modify, and cancel appointments. The API also allows viewing appointments by doctor.

## Features

- **Book an Appointment**: Patients can book an appointment with a doctor.
- **View Appointment Details**: Patients can view their booked appointment details.
- **View Appointments by Doctor**: Doctors can view all their booked appointments.
- **Cancel an Appointment**: Patients can cancel their booked appointments.
- **Modify an Appointment**: Patients can modify the time slot of their booked appointments.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **Zod**: For schema validation.
- **OpenAPI**: For API documentation.

## 🛠️ Getting Started

### Video Demo

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: 
- Install dependencies: `npm ci`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`