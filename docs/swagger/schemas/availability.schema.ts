const SlotItem = {
  type: "object",
  required: ["startTime", "endTime"],
  properties: {
    startTime: { type: "string", format: "date-time", example: "2026-05-17T02:00:00.000Z"},
    endTime: { type: "string", format: "date-time", example: "2026-05-17T03:00:00.000Z"}
  }
};

const BaseServiceItem = {
  type: "object",
  required: ["durationMin", "basePrice"],
  properties: {
    durationMin: { type: "integer", example: 60 },
    basePrice: { type: "integer", example: 900 }
  }
};

const AvailabilitySlotsResponse = {
  type: "object",
  required: ["success", "message", "data"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully fetched free time slots" },
    data: {
      type: "object",
      required: ["service", "freeSlots"],
      properties: {
        service: {
          $ref: "#/components/schemas/BaseServiceItem",
        },
        freeSlots: {
          type: "array",
          items: {
            $ref: "#/components/schemas/SlotItem",
          },
        },
      },
    },
  },
};

export const availabilitySchemas = {
  SlotItem,
  BaseServiceItem,
  AvailabilitySlotsResponse,
}


