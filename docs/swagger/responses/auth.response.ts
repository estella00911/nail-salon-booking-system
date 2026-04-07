import { authExamples } from '../examples/index.js';

const baseUnauthorizedExamples = {
  missingToken: {
    summary: "Missing token",
    value: {
      success: false,
      error: {
        type: "auth/missing-token",
        title: "Unauthorized",
        status: 401,
        detail: "Authentication required",
      },
    },
  },
  invalidTokenFormat: {
    summary: "Invalid authorization header format",
    value: {
      success: false,
      error: {
        type: "auth/invalid-token-format",
        title: "Unauthorized",
        status: 401,
        detail: "Invalid authorization header format",
      },
    },
  },
  tokenExpired: {
    summary: "Token expired",
    value: {
      success: false,
      error: {
        type: "auth/token-expired",
        title: "Unauthorized",
        status: 401,
        detail: "Authentication token has expired",
      },
    },
  },
  invalidToken: {
    summary: "Invalid token",
    value: {
      success: false,
      error: {
        type: "auth/invalid-token",
        title: "Unauthorized",
        status: 401,
        detail: "Invalid authentication token",
      },
    },
  },
  unknownTokenError: {
    summary: "Unknown token error",
    value: {
      success: false,
      error: {
        type: "auth/unknown-token-error",
        title: "Unauthorized",
        status: 401,
        detail: "Invalid token",
      },
    },
  },
};

const UnauthorizedResponse = {
  description: "Unauthorized",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      examples: {
        ...baseUnauthorizedExamples,
      },
    },
  },
}

const CurrentUserUnauthorizedResponse = {
  description: "Unauthorized",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      examples: {
        ...baseUnauthorizedExamples,
        userNotFound: {
          summary: "Authenticated user not found",
          value: {
            success: false,
            error: {
              type: "auth/user-not-found",
              title: "Unauthorized",
              status: 401,
              detail: "Authenticated user no longer exists",
            },
          },
        },
      },
    },
  },
}

const EmailConflictResponse = {
  description: "Conflict",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      example: {
        success: false,
        error: {
          type: "auth/email-conflict",
          title: "Conflict",
          status: 409,
          detail: "Email already exists",
        },
      },
    },
  },
};

const GetMeSuccessResponse = {
  description: "Invalid request parameters",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/GetMeSuccessBody",
      },
      example: {
        success: true,
        message: "Successfully get current user profile",
        data: {...authExamples.UserDetailExample},
      }
    }
  }
};

const RegisterSuccessResponse = {
  description: "Successfully registered.",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/RegisterSuccessBody",
      },
      example: {
        success: true,
        message: "Successfully registered.",
        data: {
          user: authExamples.UserDetailExample,
          token: authExamples.userTokenExample,
        },
      },
    },
  },
};

const LoginInvalidInputResponse = {
  description: "Unauthorized",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      examples: {
        missRequiredFields: {
          summary: "Miss Required Input Fields",
          value: {
            success: false,
            error: {
              type: "validation/required-register-fields",
              title: "Bad request",
              detail: "Name, email, and password are required.",
              status: 400,
            }
          }
        },
        invalidEmail: {
          summary: "Invalid Email",
          value: {
            success: false,
            error: {
              type: "validation/invalid-email",
              title: "Bad request",
              detail: "A valid email is required.",
              status: 400,
            }
          }
        },
        invalidPassword: {
          summary: "Invalid Password",
          value: {
            success: false,
            error: {
              type: "validation/invalid-password",
              title: "Bad request",
              detail: "Password must be at least 8 characters long.",
              status: 400,
            }
          }
        },
      }
    }
  }
};

const RegisterInvalidInputResponse = {
  description: "Unauthorized",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      examples: {
       ...LoginInvalidInputResponse.content['application/json'].examples,
        invalidName: {
          summary: "Invalid Name",
          value: {
            success: false,
            error: {
              type: "validation/invalid-name",
              title: "Bad request",
              detail: "Name must be at least 2 characters long.",
              status: 400,
            }
          }
        },
      }
    }
  }
};

const LoginIncorrectInputResponse = {
    description: "Unauthorized",
    content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      example: {
        success: false,
        error: {
          type: "auth/invalid-credentials",
          title: "Unauthorized",
          detail: "Invalid email or password",
          status: 401,
        }
      }
    }
  }
};

const LoginSuccessResponse = {
  description: "Successfully logged in.",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/LoginSuccessBody",
      },
      example: {
        success: true,
        message: "Successfully logged in.",
        data: {
          user: authExamples.UserDetailExample,
          token: authExamples.userTokenExample,
        },
      },
    },
  },
}
export const authResponses = {
  // success response
  GetMeSuccessResponse,
  RegisterSuccessResponse,
  LoginSuccessResponse,
  // error cases
  EmailConflictResponse,
  UnauthorizedResponse,
  CurrentUserUnauthorizedResponse,
  RegisterInvalidInputResponse,
  LoginInvalidInputResponse,
  LoginIncorrectInputResponse,
};