import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../common/errors/app-error.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";
import { isValidId, isValidDateTime, isStartBeforeEnd, isFutureDate } from "../../utils/index.js";

export const validateCreateBooking = (
  req: Request, 
  _res: Response, 
  next: NextFunction
) => {
  const { serviceId, artistId, startTime, endTime, memo } = req.body;

  // serviceId
  if (!isValidId(serviceId)) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS, 
      detail: 'serviceId must be a positive integer'
    }));
  }

  // artistId
  if (!isValidId(artistId)) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS, 
      detail: 'artistId must be a positive integer'
    }));
  }

  // startTime
  if (!isValidDateTime(startTime) || !isFutureDate(startTime)) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS, 
      detail: 'startTime must be a valid future datetime'
    }));
  }

  // endTime
  if (!isValidDateTime(endTime) || !isFutureDate(endTime)) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS, 
      detail: 'endTime must be a valid future datetime'
    }));
  }

  // start < end
  if (!isStartBeforeEnd(startTime, endTime)) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS, 
      detail: 'startTime must be earlier than endTime'
    }));
  }

  if (memo !== undefined) {
    if (typeof memo !== "string") {
      return next(
        new AppError({
          ...ERROR_CODES.COMMON.INVALID_PARAMS,
          detail: "memo must be a string",
        })
      );
    }

    const trimmed = memo.trim();

    if (trimmed.length === 0) {
      req.body.memo = undefined;
    } else {
      if (trimmed.length > 500) {
        return next(
          new AppError({
            ...ERROR_CODES.COMMON.INVALID_PARAMS,
            detail: "memo must be at most 500 characters",
          })
        );
      }

      req.body.memo = trimmed;
    }

    // normalize date
    req.body.startTime = new Date(startTime);
    req.body.endTime = new Date(endTime);

    next();
  };
}