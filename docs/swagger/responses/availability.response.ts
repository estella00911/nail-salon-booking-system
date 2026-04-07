import { availabilityExamples } from "../examples/index.js";

const AvailabilitySlotsSuccessResponse = {
  description: "Get a free slots from given serviceId, artistId, date",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              service: {
                $ref: "#/components/schemas/BaseServiceItem"
              },
              freeSlots: {
                type: "array",
                items: {$ref: "#/components/schemas/SlotItem"}
              }
            }
          }
        }
      },
      example: {
        success: true,
        message: "Successfully fetched free time slots",
        data: {
          service: availabilityExamples.BaseServiceExample,
          freeSlots: availabilityExamples.FreeSlotsExample
        }
      }
    }
  }
};

export const availabilityResponses = {
  AvailabilitySlotsSuccessResponse
};