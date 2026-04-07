import { AppError } from "../../common/errors/app-error.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";
import { prisma } from "../../lib/prisma.js";
import type { BookingReqData, BookingResponseData, getBookingInput, UserRoles } from "./booking.interface.js";
import { toBookingResponse, toMyBookingResponse } from "./booking.mapper.js";
import { checkBookingCanCancel, checkBookingNotExpired, checkBookingOwnership, type BookingCancelable } from "./booking.permission.js";

export const createBookingService = async(input: BookingReqData): Promise<BookingResponseData> => {
  const { userId, serviceId, artistId, startTime, endTime } = input;
  // 1. check service exists
  const service = await prisma.service.findFirst({
    where: { id: serviceId, isActive: true },
    select: {
      id: true,
      artistId: true,
      name: true,
      durationMin: true,
      basePrice: true,
      imgUrl: true,
    }
  });
  if (!service) {
    throw new AppError(ERROR_CODES.SERVICE.NOT_FOUND);
  }

  // 2. check artist exists
  const artist = await prisma.user.findFirst({
    where: {id: artistId, role: 'ARTIST', emailVerified: true }, 
    select: {
      id: true,
      name: true
    }
  })
  if (!artist) {
    throw new AppError(ERROR_CODES.BOOKING.ARTIST_NOT_FOUND);
  }

  // 2.1 check is aritist - service matched?
  if (service.artistId !== artist.id) {
    throw new AppError(ERROR_CODES.BOOKING.ARTIST_SERVICE_MISMATCH);
  }

  // 3. check time range is included in availability
  const availability = await prisma.availability.findFirst({
    where: {
      artistId,
      startTime: { lte: startTime },
      endTime: { gte: endTime }
    }, 
  })
  if (!availability) {
    throw new AppError(ERROR_CODES.BOOKING.TIME_NOT_AVAILABLE);
  }
  // 4. check no overlap with existing bookings
  return await prisma.$transaction(async (tx) => {
    const overlap = await tx.booking.findFirst({
      where: {
        artistId,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });

    if (overlap) {
      throw new AppError(ERROR_CODES.BOOKING.TIME_OVERLAP);
    }

    const booking = await tx.booking.create({
      data: {
        userId,
        serviceId,
        artistId,
        startTime,
        endTime,
        memo: input.memo ?? "",
        finalDuration: service.durationMin,
        finalPrice: service.basePrice,
        status: "CONFIRMED",
      },
      select: {
        id: true,
        serviceId: true,
        artistId: true,
        startTime: true,
        endTime: true,
        status: true,
        memo: true,
        finalPrice: true,
        finalDuration: true,
      }
    });
    return booking;
  });
}

export const getMyBookingsService = async (userId: number) => {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: [
      { updatedAt: "desc" },
      { createdAt: "desc" }
    ],
    include: {
      service: {
        select: {
          id: true,
          name: true,
          imgUrl: true,
          durationMin: true,
          basePrice: true,
        }
      },
      artist: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });

  return toMyBookingResponse(bookings);
};

export const getBookingByIdService = async(input: getBookingInput) => {
  const { currUserId, bookingId } = input;
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId: currUserId },
    include: {
      service: {
        include: {
          serviceTags: {
            include: {
              tag: true
            }
          }
        }
      }
    }
  })
  if (!booking) {
    throw new AppError(ERROR_CODES.BOOKING.NOT_FOUND);
  }
  
  const users:UserRoles = {
    bookingUserId: booking.userId,
    currUserId
  }
  checkBookingOwnership(users);
  
  return toBookingResponse(booking);
}

export const cancelBookingByIdService = async(input:getBookingInput) => {
  const { bookingId, currUserId } = input;
  // 1. booking is exist
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  })
  if (!booking) {
    throw new AppError(ERROR_CODES.BOOKING.NOT_FOUND);
  }
  // 3. check userId in booking == current user
  const users:UserRoles = {
    bookingUserId: booking.userId,
    currUserId
  }
  checkBookingOwnership(users);
 
  const bookingDetail: BookingCancelable = { 
    status: booking.status,
    endTime: booking.endTime
  };
  // 4. booking can be cancelled? (status should be confirmed, completed/pending/no_show can not be cancelled)
  checkBookingCanCancel(bookingDetail);

  // 5. check is booking expired?
  checkBookingNotExpired(bookingDetail);
  
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
    },
    select: {
      id: true,
      serviceId: true,
      artistId: true,
      startTime: true,
      endTime: true,
      memo: true,
      status: true,
      finalPrice: true,
      finalDuration: true
    }
  });
  return updatedBooking;
}