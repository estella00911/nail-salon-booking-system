import type { Request, Response, NextFunction } from "express";
import { cancelBookingByIdService, createBookingService, getBookingByIdService, getMyBookingsService } from "./booking.service.js";
import type { ApiResponse } from "../../types/api.types.js";
import type { AuthRequest } from "../../types/api.types.js";
import type { BookingResponseData, getBookingInput } from "./booking.interface.js";
import type { CreateBookingRequest } from "./booking.validation.js";

const createBookingController = async (
  req: AuthRequest<{}, {}, CreateBookingRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    // check userId from req?
    const userId = req.user.userId;
    const booking = await createBookingService({
      userId,
      serviceId: req.body.serviceId,
      artistId: req.body.artistId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      memo: req.body.memo,
    });

    const response: ApiResponse<BookingResponseData> = {
      success: true,
      message: "Booking created successfully.",
      data: booking
    };
    res.status(201).json(response);
  } catch (err) {
    return next(err)
  }
}

const getMyBookingsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const bookings = await getMyBookingsService(userId);
    const response = {
      success: true,
      message: "Successfully fetched bookings",
      data: bookings
    }
    return res.status(200).json(response);
  } catch (err) {
    return next(err)
  }
}

const getBookingByIdController = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = Number(req.params.id);
    const currUserId = Number(req.user.userId);

    const input: getBookingInput = {
      bookingId,
      currUserId
    }

    const data = await getBookingByIdService(input);
    const response = {
      success: true,
      message: 'Successfully fetched a booking',
      data
    }
    return res.status(200).json(response);
  } catch (err) {
    return next(err)
  }
}

const cancelBookingByIdController = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = Number(req.params.id);
    const currUserId = Number(req.user.userId);

    const input: getBookingInput = {
      bookingId,
      currUserId
    }
    const result = await cancelBookingByIdService(input);
    const response = {
      success: true,
      message: 'Successfully cancel a booking',
      data: result
    }
    return res.status(200).json(response);
  } catch (err) {
    return next(err)
  }
}

export {
  createBookingController,
  getMyBookingsController,
  getBookingByIdController,
  cancelBookingByIdController
};