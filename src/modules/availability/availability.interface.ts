export interface AvailableSlotsReqData {
  userId: number;
  artistId: number;
  serviceId: number;
  date: string;
}

export interface ServiceDetail {
  basePrice: number;
  durationMin: number;
}

export interface Interval {
  startTime: number;
  endTime: number;
}

export interface FreeSlotItem {
  startTime: string;
  endTime: string;
}

export interface FreeSlotsResData {
  service: ServiceDetail;
  freeSlots: FreeSlotItem[];
}