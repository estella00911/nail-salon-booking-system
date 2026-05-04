export const ERROR_CODES = {
  COMMON: {
    INVALID_PARAMS: {
      type: "common/invalid-params",
      title: "Invalid request parameters",
      status: 400,
    },
  },
  AUTH: {
    USER_NOT_FOUND: {
      type: "auth/user-not-found",
      title: "Unauthorized",
      status: 401,
      detail: "Authenticated user no longer exists",
    },
    INVALID_CREDENTIALS: {
      type: "auth/invalid-credentials",
      title: "Unauthorized",
      status: 401,
      detail: "Invalid email or password",
      // publicDetail: 'invalid input'
    },
    MISSING_TOKEN: {
      title: "Unauthorized",
      type: "auth/missing-token",
      status: 401,
      detail: "Authentication required"
    },
    INVALID_TOKEN_FORMAT: {
      type: "auth/invalid-token-format",
      title: "Unauthorized",
      status: 401,
      detail: "Invalid authorization header format",
    },
    TOKEN_EXPIRED: {
      type: "auth/token-expired",
      title: "Unauthorized",
      status: 401,
      detail: "Authentication token has expired",
    },
    INVALID_TOKEN: {
      type: "auth/invalid-token",
      title: "Unauthorized",
      status: 401,
      detail: "Invalid authentication token",
    },
    UNKNOWN_TOKEN_ERROR: {
      type: "auth/unknown-token-error",
      title: "Unauthorized",
      status: 401,
      detail: "Invalid token",
    },
  },
  USER: {
    EMAIL_CONFLICT: {
      type: "user/email-conflict",
      title: "Conflict",
      status: 409,
      detail: "Email is already registered",
    },
  },
  VALIDATION: {
    REQUIRED_REGISTER_FIELDS: {
      type: "validation/required-register-fields",
      title: "Bad Request",
      status: 400,
      detail: "Name, email, and password are required.",
    },
    REQUIRED_LOGIN_FIELDS: {
      type: "validation/required-login-fields",
      title: "Bad Request",
      status: 400,
      detail: "Email and password are required.",
    },
    INVALID_EMAIL: {
      type: "validation/invalid-email",
      title: "Bad Request",
      status: 400,
      detail: "A valid email is required.",
    },
    INVALID_PASSWORD: {
      type: "validation/invalid-password",
      title: "Bad Request",
      status: 400,
      detail: "Password must be at least 8 characters long.",
    },
    INVALID_NAME: {
      type: "validation/invalid-name",
      title: "Bad Request",
      status: 400,
      detail: "Name must be at least 2 characters long.",
    },
  },
  SERVICE: {
    NOT_FOUND: {
      type: "service/not-found",
      title: "Service with the given ID was not found",
      status: 404,
      detail: "Service with the given ID was not found",
    }
  },
  INTERNAL: {
    SERVER_ERROR: {
      type: "internal/server-error",
      title: "internal server error",
      status: 500,
      detail: "an unexpected error occurred",
    }
  },
  BOOKING: {
    ARTIST_SERVICE_MISMATCH: {
      type: "booking/artist-service-mismatch",
      title: "booking mismatch error",
      detail: "Selected artist does not provide this service",
      status: 400
    },
    TIME_NOT_AVAILABLE: {
      type: "booking/time-not-available",
      title: "Time slot is not available",
      detail: "The selected time range is outside the artist's availability",
      status: 400
    },
    TIME_OVERLAP: {
      type: "booking/time-overlap",
      title: "Booking conflict",
      detail: "The selected time is already booked",
      status: 409
    },
    ARTIST_NOT_FOUND: {
      type: "booking/artist-not-found",
      title: "Artist not found",
      detail: "The specified artist does not exist or is not available",
      status: 404
    },
    NOT_FOUND: {
      type: "booking/not-found",
      title: "Booking not found",
      detail: "The requested booking does not exist",
      status: 404
    },

    FORBIDDEN: {
      type: "booking/forbidden",
      title: "Forbidden",
      detail: "You are not allowed to cancel this booking",
      status: 403
    },

    INVALID_STATUS: {
      type: "booking/invalid-status",
      title: "Invalid booking status",
      detail: "Only confirmed bookings can be cancelled",
      status: 400
    },

    ALREADY_STARTED: {
      type: "booking/already-started",
      title: "Booking already started",
      detail: "This booking has already started or passed and cannot be cancelled",
      status: 400
    }
  }
}