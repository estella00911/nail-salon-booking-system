import { serviceExamples } from "./service.example.js";

const cancelledBookingExample = {
  id: 1,
  serviceId: 1,
  artistId: 4,
  startTime: "2026-04-16T03:00:00.000Z",
  endTime: "2026-04-16T04:00:00.000Z",
  status: "CANCELLED",
  memo: null,
  finalPrice: 900,
  finalDuration: 60
}

const bookingItem = {
  "id": 1,
  "serviceId": 1,
  "artistId": 4,
  "startTime": "2026-04-20T10:00:00.000Z",
  "endTime": "2026-04-20T11:00:00.000Z",
  "status": "CONFIRMED",
  "memo": "Please help me keep the design simple and elegant.",
  "finalPrice": 900,
  "finalDuration": 60,
}

const myBookingsExample = [
  {
    "id": 1,
    "serviceId": 1,
    "artistId": 4,
    "startTime": "2026-05-16T02:00:00.000Z",
    "endTime": "2026-05-16T03:00:00.000Z",
    "status": "CANCELLED",
    "memo": "",
    "finalPrice": 900,
    "finalDuration": 60,
    "service": {
        "id": 1,
        "name": "日系可愛插畫",
        "imgUrl": "https://images.unsplash.com/photo-1754799670410-b282791342c3?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "durationMin": 60,
        "basePrice": 900
    },
    "artist": {
        "id": 4,
        "name": "Mia"
    }
  },
  {
    "id": 3,
    "serviceId": 1,
    "artistId": 4,
    "startTime": "2026-05-17T11:00:00.000Z",
    "endTime": "2026-05-17T13:00:00.000Z",
    "status": "CONFIRMED",
    "memo": "",
    "finalPrice": 900,
    "finalDuration": 60,
    "service": {
        "id": 1,
        "name": "日系可愛插畫",
        "imgUrl": "https://images.unsplash.com/photo-1754799670410-b282791342c3?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "durationMin": 60,
        "basePrice": 900
    },
    "artist": {
        "id": 4,
        "name": "Mia"
    }
  }
]
const bookingItemExample = {
  id: 1,
  serviceId: 1,
  artistId: 4,
  startTime: "2026-04-20T10:00:00.000Z",
  endTime: "2026-04-20T11:00:00.000Z",
  status: "CONFIRMED",
  memo: "abc",
  finalPrice: 900,
  finalDuration: 60,
};

const bookingDetailExample = {
  ...bookingItemExample,
  service: {
    ...serviceExamples.serviceItemExample,
    tags: serviceExamples.tagItemListExample,
  },
  artist: {
    id: 4,
    name: "Mia",
  },
};

export const bookingExamples = {
  myBookingsExample,
  bookingItem,
  cancelledBookingExample,
  bookingItemExample,
  bookingDetailExample,
}