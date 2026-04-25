import express, {type Request, type Response} from "express";
import cors from "cors";
import userRouter from './modules/auth/auth.route.js';
import serviceRouter from './modules/service/service.route.js';
import bookingRouter from './modules/booking/booking.route.js';

import availabilityRouter from './modules/availability/availability.route.js';
import { errorHandler } from "./middleware/error.middleware.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../docs/swagger/swagger.config.js";

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

// swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/availability', availabilityRouter);

// middleware
app.use(errorHandler);



app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json("Hello World");
});

export default app;