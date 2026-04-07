import type { Status } from "../../generated/prisma/client.js";

export interface BookingReqData {
  serviceId: number;
  artistId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  memo?: string;
}

export interface BookingResponseData {
  id: number;
  serviceId: number;
  artistId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  status: Status;
  finalDuration: number;
  finalPrice: number;
  memo: string;
  updatedAt: Date;
  createdAt: Date;
}