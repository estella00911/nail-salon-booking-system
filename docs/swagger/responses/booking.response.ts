import { bookingExamples, serviceExamples } from "../examples/index.js";

const GetMyBookingSuccessResponse = {
  description: "Booking not found",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/GetMyBookingResponse",
      },
      example: {
        success: true,
        message: "Get my bookings successfully.",
        data: {...bookingExamples.myBookingsExample}
      }
    }
  }
};

const GetBookingByIdSuccessResponse = {
  description: "Successfully fetched a booking",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/GetBookingByIdResponse",
      },
      example: {
        success: true,
        message: "Successfully fetched a booking.",
        data: bookingExamples.bookingDetailExample,
      },
    },
  },
};

const CancelBookingByISuccessResponse = {
  description: "Successfully cancelled booking",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/GetBookingByIdResponse",
      },
      example: {
        success: true,
        message: "Successfully cancelled booking",
        data: bookingExamples.cancelledBookingExample
      }
    },
  },
};

const CreateBookingSuccessResponse = {
  description: "Booking created successfully",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/GetBookingByIdResponse",
      },
      example: {
        success: true,
        message: "Booking created successfully",
        data: bookingExamples.bookingItem
      }
    },
  },
};


const BookingNotFound = {
  description: "Booking not found",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      example: {
        success: false,
        error: {
          type: "booking/not-found",
          title: "Booking not found",
          detail: "The requested booking does not exist",
          status: 404
        },
      },
    }
  },
};

const BookingAccessForbidden = {
  description: "Forbidden",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      example: {
        success: false,
        error: {
          type: "booking/forbidden",
          title: "Forbidden",
          detail:  "You are not allowed to access this booking",
          status: 403
        },
      },
    }
  },
};

const BookingDependencyNotFoundResponse = {
  description: "Service not found",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      examples: {
        serviceNotFound: {
          summary: "Service not found",
          value: {
            success: false,
            error: {
              type: "service/not-found",
              title: "Not Found",
              detail: "Service not found",
              status: 404,
            },
          },
        },
        artistNotFound: {
          summary: "Artist not found",
          value: {
            success: false,
            error: {
              type: "booking/artist-not-found",
              title: "Artist not found",
              detail: "The specified artist does not exist or is not available",
              status: 404,
            },
          }
        },
      },
    },
  },
};
const BookingInvalidParamsResponse = {
  description: "Invalid request parameters",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      examples: {
        invalidId: {
          summary: "Invalid ID",
          value: {
            success: false,
            error: {
              type: "common/invalid-params",
              title: "Invalid request parameters",
              detail: "serviceId must be a positive integer",
              status: 400,
            },
          },
        },
        invalidTime: {
          summary: "Invalid time range",
          value: {
            success: false,
            error: {
              type: "common/invalid-params",
              title: "Invalid request parameters",
              detail: "startTime must be earlier than endTime",
              status: 400,
            },
          },
        },
      },
    },
  },
}

const BookingTimeOverlap = {
  description: "Booking time conflict",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      example: {
        success: false,
        error: {
          type: "booking/time-overlap",
          title: "Booking conflict",
          detail: "The selected time is already booked",
          status: 409,
        },
      },
    },
  },
};
const CancelBookingBadRequestResponse = {
  description: "Invalid cancel booking request",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      examples: {
        invalidStatus: {
          summary: "Invalid booking status",
          value: {
            success: false,
            error: {
              type: "booking/invalid-status",
              title: "Invalid booking status",
              detail: "Only confirmed bookings can be cancelled",
              status: 400
            },
          },
        },
        alreadyStarted: {
          summary: "Booking already started",
          value: {
            success: false,
            error: {
              type: "booking/already-started",
              title: "Booking already started",
              detail: "This booking has already started or passed and cannot be cancelled",
              status: 400
            },
          },
        },
      },
    }
  }
};

export const bookingResponses = {
  GetMyBookingSuccessResponse,
  GetBookingByIdSuccessResponse,
  CancelBookingByISuccessResponse,
  CreateBookingSuccessResponse,

  BookingNotFound,
  BookingAccessForbidden,
  BookingDependencyNotFoundResponse,
  BookingInvalidParamsResponse,
  BookingTimeOverlap,
  CancelBookingBadRequestResponse,
};