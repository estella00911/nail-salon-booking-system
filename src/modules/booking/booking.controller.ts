import type { Request, Response, NextFunction } from "express";
import { createBookingService, getBookingByIdService, getMyBookingsService } from "./booking.service.js";
import type { ApiResponse } from "../../types/api.types.js";
import type { BookingResponseData } from "./booking.interface.js";

export const createBookingController = async(req:Request, res: Response, next: NextFunction) => {
  try {
    // check userId from req?
    const userId = req.user!.userId;
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
  } catch(err) {
    return next(err)
  }
}

export const getMyBookingsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const bookings = await getMyBookingsService(userId);
    const response = {
      success: true,
      message: "successfully fetched bookings",
      data: bookings
    }
    return res.status(200).json(response);
  } catch(err) {
    return next(err)
  }
}

export const getBookingByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBookingByIdService(req.validated!.id!);
    const response = {
      success: true, 
      message: 'successfully fetched a booking',
      data
    }
    return res.status(200).json(response);
  } catch(err) {
    return next(err)
  }
}