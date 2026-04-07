import { serviceSchemas, authSchemas, bookingSchemas, commonSchemas, availabilitySchemas } from "./schemas/index.js";
import { commonResponses, serviceResponses, bookingResponses, authResponses, availabilityResponses } from "./responses/index.js";

export const swaggerComponents = {
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: {
    ...commonSchemas,
    ...authSchemas,
    ...bookingSchemas,
    ...serviceSchemas,
    ...availabilitySchemas,
  },
  responses: {
    ...commonResponses,
    ...serviceResponses,
    ...bookingResponses,
    ...authResponses,
    ...availabilityResponses,
  },
};