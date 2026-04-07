import express, {type Request, type Response} from "express";
import userRouter from './modules/auth/auth.route.js';
import serviceRouter from './modules/service/service.route.js';
import bookingRouter from './modules/booking/booking.route.js';
import { errorHandler } from "./middleware/error.middleware.js";
import { AppError } from "./common/errors/app-error.js";
import { ERROR_CODES } from "./common/errors/error-code.js";



const app = express();
app.use(express.json());

// routes
app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/bookings', bookingRouter);

// middleware
app.use(errorHandler);


app.get("/", async (req: Request, res: Response) => {
  res.status(200).json("Hello World");
});

export default app;