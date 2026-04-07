import type { BookingTagResponse, ServiceTagRelation } from "./booking.interface.js";

export const toBookingResponse = (booking: any) => {
  const { serviceTags, ...restService } = booking.service;

  return {
    id: booking.id,
    serviceId: booking.serviceId,
    artistId: booking.artistId,
    startTime: booking.startTime,
    endTime: booking.endTime,
    status: booking.status,
    memo: booking.memo,
    finalPrice: booking.finalPrice,
    finalDuration: booking.finalDuration,
    service: {
      id: restService.id,
      name: restService.name,
      imgUrl: restService.imgUrl,
      durationMin: restService.durationMin,
      basePrice: restService.basePrice,
      tags: serviceTags.map((st: ServiceTagRelation): BookingTagResponse => ({
        id: st.tag.id,
        name: st.tag.name,
        type: st.tag.type,
        slug: st.tag.slug,
      })),
    },
  };
};

export const toMyBookingResponse = (bookings: any[]) => {
  return bookings.map((booking: any) => ({
    id: booking.id,
    serviceId: booking.serviceId,
    artistId: booking.artistId,
    startTime: booking.startTime,
    endTime: booking.endTime,
    status: booking.status,
    memo: booking.memo,
    finalPrice: booking.finalPrice,
    finalDuration: booking.finalDuration,
    service: {
      id: booking.service.id,
      name: booking.service.name,
      imgUrl: booking.service.imgUrl,
      durationMin: booking.service.durationMin,
      basePrice: booking.service.basePrice,
    },
    artist: {
      ...booking.artist
    }
  }));
}