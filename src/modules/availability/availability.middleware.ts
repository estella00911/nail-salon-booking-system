import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../common/errors/app-error.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";
import dayjs from "dayjs";

export const validateAvailableSlot = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const serviceId = Number(req.query.serviceId);
  const artistId = Number(req.query.artistId);
  const { date } = req.query;

  // service id
  if (isNaN(serviceId) ||
    !Number.isInteger(serviceId) ||
    serviceId <= 0
  ) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS,
      detail: 'artistId must be a positive integer'
    }))
  }

  // aritist id
  if (isNaN(artistId) ||
    !Number.isInteger(artistId) ||
    artistId <= 0
  ) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS,
      detail: 'serviceId must be a positive integer'
    }));
  }

  // date format + real date check
  if (
    !date ||
    typeof date !== "string" ||
    !dayjs(date, "YYYY-MM-DD", true).isValid()
  ) {
    return next(
      new AppError({
        ...ERROR_CODES.COMMON.INVALID_PARAMS,
        detail: "date must be in format YYYY-MM-DD",
      })
    );
  }
  // check date is after current date 
  if (dayjs(date).isBefore(dayjs(), "day")) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS,
      detail: "date cannot be in the past",
    }));
  }
  // TODO: allow bookings only within the next 30 days
  req.body = {
    ...req.body,
    booking: {
      date,
      serviceId,
      artistId
    }
  }

  next();
}