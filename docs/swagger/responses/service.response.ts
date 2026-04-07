import { serviceExamples } from "../examples/service.example.js";

const ServiceNotFoundResponse = {
  description: "Service not found",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      example: {
        success: false,
        error: {
          type: "service/not-found",
          title: "Not Found",
          detail: "Service not found",
          status: 404,
        },
      },
    },
  },
};

const GetAllServicesSuccessResponse = {
  description: "Successfully fetched services",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/GetAllServicesResponse",
      },
      example: {
        success: true,
        message: "Successfully fetched service",
        data: serviceExamples.servicesWithTagExample,
      },
    },
  },
};

const GetServiceByIdSuccessResponse = {
  description: "Successfully fetched a service",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/GetServiceByIdResponse",
      },
      example: {
        success: true,
        message: "Successfully fetched service",
        data: serviceExamples.serviceWithTagExample
      },
    },
  },
};



export const serviceResponses = {
  ServiceNotFoundResponse,
  GetAllServicesSuccessResponse,
  GetServiceByIdSuccessResponse,
}