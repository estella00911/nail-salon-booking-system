const SuccessResponse = {
  type: "object",
  required: ["success", "message", "data"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully processed request" },
    data: {},
  },
}

const ErrorResponse = {
  type: "object",
  required: ["success", "error"],
  properties: {
    success: { type: "boolean", example: false },
    error: {
      $ref: "#/components/schemas/ErrorDetail",
    },
  },
}

const ErrorDetail = {
  type: "object",
  required: ["type", "title", "status", "detail"],
  properties: {
    type: { type: "string", example: "auth/invalid-credentials" },
    title: { type: "string", example: "Unauthorized" },
    detail: { type: "string", example: "Invalid email or password" },
    status: { type: "integer", example: 401 },
  },
};

export const commonSchemas = {
  SuccessResponse,
  ErrorResponse,
  ErrorDetail,
};
