import dayjs from "dayjs";
import type { AvailableSlotsReqData, FreeSlotsResData, Interval, ServiceDetail } from "./availability.interface.js";
import { prisma } from "../../lib/prisma.js";
import { AppError } from "../../common/errors/app-error.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";

export const getAvailableSlotsService = async(input:AvailableSlotsReqData): Promise<FreeSlotsResData> => {
  const {userId, artistId, serviceId, date} = input;
  // 1. check availability exist w/ artistId, serviceId, date
  const startOfDay = dayjs(date).startOf("day").toDate();
  const endOfDay = dayjs(date).endOf("day").toDate();

  // check artist has serviceId
  const availabilities = await prisma.availability.findMany({
    where: {
      artistId,
      startTime: { lte: endOfDay },
      endTime: { gte: startOfDay },
    },
    orderBy: {
      startTime: "asc",
    },
  })

  // get service base duration and basePrice
  const service = await prisma.service.findFirst({
    where: {id: serviceId, artistId, isActive: true},
    select: {
      durationMin: true,
      basePrice: true,
    }
  })
  if (!service) {
    throw new AppError(ERROR_CODES.SERVICE.NOT_FOUND);
  }

  // get bookings
  const bookings = await prisma.booking.findMany({
    where: {
      artistId,
      startTime: { lte: endOfDay },
      endTime: { gte: startOfDay },
    },
    orderBy: {
      startTime: "asc",
    },
  })

  // calculate free time slots after availabilities - bookings
  const availableRanges: Interval[] = availabilities.map((item) => ({
  startTime: item.startTime.getTime(),
  endTime: item.endTime.getTime(),
  }));

  const bookingRanges: Interval[] = bookings.map((item) => ({
   startTime: item.startTime.getTime(),
   endTime: item.endTime.getTime(),
   }));

  const freeSlots = subtractBookingFromAvailable(availableRanges, bookingRanges);

  if (freeSlots.length === 0) {
    return {
      service,
      freeSlots: [],
    };
  }

  const duration = service.durationMin * 60 * 1000;
  const result: Interval[] = [];

  let i = 0;

  while (i < freeSlots.length) {
    const currSlot = freeSlots[i]!;
    let curr = currSlot.startTime;

    while (curr + duration <= currSlot.endTime) {
      result.push({
        startTime: curr,
        endTime: curr + duration,
      });
      curr += duration;
    }

    i++;
  }
  const formattedFreeSlots: FreeSlotsResData["freeSlots"] = result.map((slot) => ({
    startTime: new Date(slot.startTime).toISOString(),
    endTime: new Date(slot.endTime).toISOString(),
  }));

  return {
    service,
    freeSlots: formattedFreeSlots,
  };
}

const isOverlap = (t1: Interval, t2: Interval): boolean => {
  if (t1.endTime <= t2.startTime || t2.endTime <= t1.startTime) {
    return false;
  }
  return true;
};

const getFreeSlots = (t1: Interval, t2: Interval, freeSlots: Interval[]): Interval | null => {
  if (t1.startTime <= t2.startTime && t1.endTime <= t2.endTime) {
    if (t1.startTime < t2.startTime) {
      freeSlots.push({startTime: t1.startTime, endTime: t2.startTime });
    }
    return null;
  } else if (t1.startTime <= t2.startTime && t2.endTime <= t1.endTime) {
    if (t1.startTime < t2.startTime) {
      freeSlots.push({startTime: t1.startTime, endTime: t2.startTime });
    }
    return {startTime: t2.endTime, endTime: t1.endTime };
  } else if (t2.startTime <= t1.startTime && t2.endTime <= t1.endTime) {
    return {startTime: t2.endTime, endTime: t1.endTime };
  } else {
    return null;
  }
};

const subtractBookingFromAvailable = (available: Interval[], booking: Interval[]) => {
  const freeSlots: Interval[] = [];
  let i = 0;
  let j = 0;

  while (i < available.length && j < booking.length) {
    const currAvailable = available[i]!;
    const currBooking = booking[j]!;

    if (isOverlap(currAvailable, currBooking)) {
      const remain = getFreeSlots(currAvailable, currBooking, freeSlots);

      if (remain) {
        available[i] = remain;
        j++;
      } else {
        i++;
      }
    } else if (currAvailable.endTime <= currBooking.startTime) {
      freeSlots.push(currAvailable);
      i++;
    } else {
      j++;
    }
  }

  while (i < available.length) {
    freeSlots.push(available[i]!);
    i++;
  }
  
  return freeSlots;
};

