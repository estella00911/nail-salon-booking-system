import { AppError } from "../../common/errors/app-error.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";
import { Status } from "../../generated/prisma/client.js";
import type { UserRoles } from "./booking.interface.js";

export type BookingCancelable = {
  status: Status;
  endTime: Date;
};

export const checkBookingOwnership = (userRoles: UserRoles) => {
  const {bookingUserId, currUserId} = userRoles;
  if (bookingUserId !== currUserId) {
    throw new AppError({
      ...ERROR_CODES.BOOKING.FORBIDDEN,
      detail: "You are not allowed to access this booking"
    });
  }
}

export const checkBookingCanCancel = (booking: BookingCancelable) => {
  if (
    booking.status !== Status.CONFIRMED &&
    booking.status !== Status.PENDING
  ) {
    throw new AppError({
      ...ERROR_CODES.BOOKING.INVALID_STATUS,
      detail: `Booking with status ${booking.status} cannot be cancelled`
    });
  }
};

export const checkBookingNotExpired = (booking: BookingCancelable) => {
  if (booking.endTime < new Date()) {
    throw new AppError(ERROR_CODES.BOOKING.ALREADY_STARTED);
  }
};
