const BookingStatus = {
  type: "string",
  enum: ["CONFIRMED", "CANCELLED", "COMPLETED", "PENDING", "NO_SHOW"],
}

const ArtistItem = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "Mia" },
  },
};

const BookingItem = {
  type: "object",
  required: [
    "id",
    "serviceId",
    "artistId",
    "startTime",
    "endTime",
    "status",
    "memo",
    "finalPrice",
    "finalDuration",
  ],
  properties: {
    id: { type: "integer", example: 1 },
    serviceId: { type: "integer", example: 1 },
    artistId: { type: "integer", example: 4 },
    startTime: {
      type: "string",
      format: "date-time",
      example: "2026-04-20T10:00:00.000Z",
    },
    endTime: {
      type: "string",
      format: "date-time",
      example: "2026-04-20T11:00:00.000Z",
    },
    status: {
      $ref: "#/components/schemas/BookingStatus",
    },
    memo: { type: "string", example: "abc" },
    finalPrice: { type: "integer", example: 900 },
    finalDuration: { type: "integer", example: 60 },
  },
};

const BookingDetailItem = {
  type: "object",
  required: [
    "id",
    "serviceId",
    "artistId",
    "startTime",
    "endTime",
    "status",
    "memo",
    "finalPrice",
    "finalDuration",
    "service",
    "artist",
  ],
  properties: {
    id: { type: "integer", example: 1 },
    serviceId: { type: "integer", example: 1 },
    artistId: { type: "integer", example: 4 },
    startTime: {
      type: "string",
      format: "date-time",
      example: "2026-04-20T10:00:00.000Z",
    },
    endTime: {
      type: "string",
      format: "date-time",
      example: "2026-04-20T11:00:00.000Z",
    },
    status: {
      $ref: "#/components/schemas/BookingStatus",
    },
    memo: { type: "string", nullable: true, example: "abc" },
    finalPrice: { type: "integer", example: 900 },
    finalDuration: { type: "integer", example: 60 },
    service: {
      $ref: "#/components/schemas/ServiceWithTagItem",
    },
    artist: {
      $ref: "#/components/schemas/ArtistItem",
    },
  },
};

const BookingWithTagItem = {
  type: "object",
  required: [...BookingItem.required, "service"],
  properties: {
    ...BookingItem.properties,
    service: {
      $ref: "#/components/schemas/ServiceWithTagItem",
    },
  },
};

const MyBookingItem = {
  type: "object",
  required: [
    ...BookingItem.required,
    "service",
    "artist"
  ],
  properties: {
    ...BookingItem.properties,
    service: {
      $ref: "#/components/schemas/ServiceItem",
    },
    artist: {
      $ref: "#/components/schemas/ArtistItem",
    }
  }
}

const CreateBookingRequest = {
  type: "object",
  required: ["serviceId", "artistId", "startTime", "endTime"],
  properties: {
    serviceId: { type: "integer", example: 1},
    artistId: { type: "integer", example: 4},
    startTime: { type: "string", format: 'date-time', example: "2026-04-20T10:00:00.000Z"},
    endTime: { type: "string", format: 'date-time', example: "2026-04-20T11:00:00.000Z"},
    memo: {
      type: "string",
      example: "Please help me keep the design simple and elegant.",
    },
  }
};

const CreateBookingResponse = {
  type: "object",
  required: ["success", "data", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Booking created successfully." },
    data: {
      $ref: "#/components/schemas/BookingItem",
    },
  }
}

const GetBookingByIdResponse = {
  type: "object",
  required: ["success", "data", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully fetched a booking." },
    data: {
      $ref: "#/components/schemas/BookingDetailItem",
    },
  },
};

const GetMyBookingResponse = {
  type: "object",
  required: ["success", "data", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully fetched a booking." },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/MyBookingItem",
      },
    }
  }
}

const CancelBookingByIdResponse = {
  type: "object",
  required: ["data", "success", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully cancel a booking." },
    data: {
      allOf: [
        { $ref: "#/components/schemas/BookingItem" }
      ],
    }
  }
};

export const bookingSchemas = {
  // entity: single booking data structure
  BookingItem, 
  BookingStatus,
  BookingWithTagItem,
  MyBookingItem,
  ArtistItem,
  BookingDetailItem,
  // example objects for Swagger display
  // myBookingList,
  // cancelledBooking,
  // API request payloads/ success responses
  CreateBookingRequest, 
  CreateBookingResponse,
  GetBookingByIdResponse,
  GetMyBookingResponse,
  CancelBookingByIdResponse,
}
