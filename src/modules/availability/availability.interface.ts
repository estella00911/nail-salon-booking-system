export interface AvailableSlotsReqData {
  userId: number;
  artistId: number;
  serviceId: number;
  date: string;
}
export interface Interval { 
  startTime: number; 
  endTime: number;
}

export interface ServiceDetail {
  basePrice: number;
  durationMin: number;
}
export interface FreeSlotsResData {
  service: ServiceDetail;
  freeSlots: Interval[];
}