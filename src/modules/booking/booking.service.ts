import { AppError } from "../../common/errors/app-error.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";
import { prisma } from "../../lib/prisma.js";
import type { BookingReqData } from "./booking.interface.js";

export const createBookingService = async(input: BookingReqData) => {
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

  return bookings;
};

export const getBookingByIdService = async(id: number) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
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
    return new AppError(ERROR_CODES.BOOKING.NOT_FOUND);
  }
  const { serviceTags, ...restService } = booking.service;

  const data = {
    ...booking,
    service: {
      ...restService,
      tags: serviceTags.map(st => st.tag),
    },
  }

  return data;
}