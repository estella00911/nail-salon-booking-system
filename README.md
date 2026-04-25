# Nail Salon Booking System

## Overview

### Problem & Solution
This project solves real-world scheduling problems in nail salons. Instead of manual booking via messages or phone calls, it provides a system where users can view available time slots and make bookings directly, reducing double booking and improving efficiency.

### Technical Highlights
This project demonstrates RESTful API design, authentication and authorization, booking workflow implementation, relational database modeling, and environment-based development with Docker and Prisma.

### Scope
The current version focuses on customer booking flow and service APIs. Admin management and frontend integration are planned for future iterations.

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


### Booking
- Create a booking
- View my bookings
- View booking details
- Cancel a booking with validation (status, ownership, and time constraints)

### Error Handling
- Centralized error handler middleware
- Consistent API response format
- Environment-based error detail handling

## API
### Live API

- Base URL: [https://api.lunailstudio.com](https://api.lunailstudio.com)
- Swagger Docs: [https://api.lunailstudio.com/api-docs](https://api.lunailstudio.com)
### API Testing (Postman)
You can test the API using Postman.

#### Setup
1. Import collection:
   - docs/postman_collection.json

2. Import environment:
   - docs/postman_environment.json

3. Select the environment in Postman

4. Run the login request first to automatically set the token

5. All protected APIs will use the token automatically

### API Overview

#### Auth
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/me`

#### Services
- `GET /api/services`
- `GET /api/services/:id`

#### Bookings
- `POST /api/bookings`
- `GET /api/bookings/me`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id/cancel`

#### Availability
- `GET /api/availability/slots`

## Project Structure

```text
src/
├── lib/                            # Shared instances (e.g., Prisma client)
├── docs/                           # API docs, Postman collections, diagram
│   ├── swagger/                    # swagger definitions
│   ├── postman_collection.json     # API request collection
│   ├── postman_environment.json    # environment variables (base_url, token)
│   └── drawSQL.png                 # database schema diagram
├── common/                         
│   └── errors/                     # error classes and error codes
├── middleware/                     # express middleware (auth, validation, error handler)
├── modules/                        # feature-based modules
│   ├── user/                       # auth & user profile
│   ├── service/                    # nail services
|   ├── availability/               # available time slots logic
│   └── booking/                    # API for booking a reservation
├── types/                          # shared TypeScript types
├── utils/                          # utility functions
├── config.ts                       # app configuration
├── app.ts                          # express app setup
└── server.ts                       # server entry point
```

## Future Improvements
- Admin APIs
- Service filtering and search on the browsing page (e.g., price, duration, tags)
- Reschedule booking
- Frontend integration

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
PORT=3000                          # Server port
NODE_ENV=production                # Set to 'production' in deployed environment; set to 'developement' in local environment
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET=YOUR-SECRET-KEY
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173  # Development (frontend runs locally on Vite default port 5173)
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

### Function Map
![function-map](./docs/function_map.png)

### UI/UX Design
The design focuses on a simple booking flow: browse → select service → choose time → confirm booking.

[View Figma Design](https://www.figma.com/design/fblv4fbU2xERfVWYZcUHUh/Nail-Salon-UI?node-id=0-1&t=dmMNTxofQQulqryb-1)


### Product Specification
The project is guided by a product specification document outlining user roles, booking flow, and system requirements.
