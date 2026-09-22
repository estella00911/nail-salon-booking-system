import type { Status, Type } from "../../generated/prisma/client.js";

export interface BookingReqData {
  serviceId: number;
  artistId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  memo?: string | undefined;
}

export interface BookingResponseData {
  serviceId: number;
  artistId: number;
  startTime: Date;
  endTime: Date;
  status: Status;
  finalDuration: number;
  finalPrice: number;
  memo: string;
}

export interface getBookingInput {
  bookingId: number;
  currUserId: number;
};

export interface UserRoles {
  bookingUserId: number,
  currUserId: number
}

export interface TagItem {
  id: number;
  name: string;
  slug: string;
  type: Type;
  displayOrder: number | null;
  createdAt: Date;
}

export interface BookingTagResponse {
  id: number;
  name: string;
  slug: string;
  type: Type;
}

export interface ServiceTagRelation {
  serviceId: number;
  tagId: number;
  tag: TagItem;
}