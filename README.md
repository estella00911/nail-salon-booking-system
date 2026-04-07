# Nail Salon Booking System

## Overview

### Problem & Solution
This project solves real-world scheduling problems in nail salons. Instead of manual booking via messages or phone calls, it provides a system where users can view available time slots and make bookings directly, reducing double booking and improving efficiency.

### Technical Highlights
This project demonstrates RESTful API design, authentication and authorization, booking workflow implementation, relational database modeling, and environment-based development with Docker and Prisma.

### Scope
The current version focuses on customer booking flow and service APIs. Admin management and frontend integration are planned for future iterations.
>>>>>>> 7617fc2 (feat: add available slots, swagger API docs)

## Techniques Used
### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### DevOps / Tooling
- Docker
- Prisma Studio
- Makefile

### Authentication
- JWT
- Protected routes via middleware

## Features

### Authentication
- User registration
- User login with JWT
- Protected routes
- Get current user profile

### Services
- Get all services
- Filter services by tag
- Featured service sorting
- Pagination support
- Get service details by ID

<<<<<<< HEAD
### Booking ((In Progress))
- Create booking
- View my bookings
- View booking details
- Cancel booking
=======
### Booking
- Create a booking
- View my bookings
- View booking details
- Cancel a booking with validation (status, ownership, and time constraints)
>>>>>>> 7617fc2 (feat: add available slots, swagger API docs)

### Error Handling
- Centralized error handler middleware
- Consistent API response format
- Environment-based error detail handling

## API Overview

### Auth
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/me`

### Services
- `GET /api/services`
- `GET /api/services/:id`

### Bookings
- `POST /api/bookings`
- `GET /api/bookings/me`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id/cancel`

### Availability
- `GET /api/availability/slots`

## Project Structure

```text
src/
├── lib/
├── common/
│   └── errors/
├── middleware/
├── modules/
│   ├── user/
│   ├── service/
|   ├── availability/
│   └── booking/
├── types/
├── utils/
├── config.ts
├── app.ts
└── server.ts
```

## Future Improvements
- Admin APIs
- Service filtering and search on the browsing page (e.g., price, duration, tags)
- Reschedule booking
- Frontend integration
- AWS deployment

## Getting Started
### 1. Clone Project
```
git clone https://github.com/your-repo/nail-salon-booking-system.git
cd nail-salon-booking-system
```
### 2. Setup Environment Variables
Create `.env`
```
cp .env.example .env
```
Edit `.env`:
```
NODE_ENV=development
DATABASE_URL="postgresql://postgres:prisma@localhost:8888/postgres?schema=public"
JWT_SECRET={your_secret}
JWT_EXPIRES_IN=7d
```

##  Recommended: Local server + Docker DB
### 3. Start Database (Docker)
>
```
make db-dev
```
This command will:
- start PostgreSQL in Docker
- generate Prisma client
- run migrations
- seed initial data

### 4. Run Server (local)
```
npm run server-dev
``` 
Server runs on `localhost:3000`

### 5. Open Prisma Studio (optional)
```
npx prisma studio
```
Database UI on `http://localhost:5555`
## Alternative: Run everything with Docker
### 1. Use `.env.prod`
```
NODE_ENV=production
DATABASE_URL="postgresql://postgres:prisma@postgres_db:5432/postgres?schema=public"
```
### 2. Start all services
```
make up
```
## Manual Setup (optional)
If you don’t want to use Makefile:
```
docker compose up -d postgres_db

npx prisma generate
npx prisma migrate dev
npx prisma db seed

npm run start:dev
```

## System Design
### Database Schema
![DB-schema](./docs/drawSQL.jpg)
### UI/UX Design
The design focuses on a simple booking flow: browse → select service → choose time → confirm booking.

[View Figma Design](https://www.figma.com/design/fblv4fbU2xERfVWYZcUHUh/Nail-Salon-UI?node-id=0-1&t=dmMNTxofQQulqryb-1)


### Product Specification
The project is guided by a product specification document outlining user roles, booking flow, and system requirements.
