# Doctor Appointment System

A RESTful API for managing doctor appointments built with Express.js, TypeScript, MongoDB, and Awilix for dependency injection.

## Features

- Doctor Availability Management
  - Create, view, and manage time slots
  - Mark slots as reserved
- Appointment Booking
  - Book appointments in available slots
  - View appointment details
- Doctor Appointment Management
  - View upcoming appointments
  - Mark appointments as completed or cancelled
- Automatic notifications (currently implemented as console logs)

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd doctor-appointments-express
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB using Docker:
   ```bash
   docker-compose up -d
   ```

4. Create a `.env` file based on `.env.development`

5. Build and start the application:
   ```bash
   npm run build
   npm start
   ```

   For development with hot reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Doctor Availability

- POST `/api/slots` - Create a new time slot
- GET `/api/slots` - List all slots
- GET `/api/slots/:id` - Get slot by ID
- PATCH `/api/slots/:id/reserve` - Reserve a slot
- DELETE `/api/slots/:id` - Delete a slot

### Appointment Booking

- POST `/api/appointments` - Book an appointment
- GET `/api/appointments/:id` - Get appointment details

### Doctor Appointment Management

- GET `/api/doctor-management/appointments/upcoming/:doctorId` - Get upcoming appointments
- POST `/api/doctor-management/appointments/:id/complete` - Mark appointment as completed
- POST `/api/doctor-management/appointments/:id/cancel` - Cancel appointment

## Project Structure

```
src/
├── config/             # Configuration files
├── modules/            # Feature modules
│   ├── doctor-availability/
│   ├── appointment-booking/
│   └── doctor-management/
├── shared/            # Shared types and utilities
├── index.ts          # Application entry point
└── routes.ts         # Route definitions
```

## Testing

Run the tests using:
```bash
npm test
```

## License

MIT
