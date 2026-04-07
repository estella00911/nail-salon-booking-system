const InvalidIdParamsResponse = {
  description: "Invalid request parameters",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
      example: {
        success: false,
        error: {
          type: "common/invalid-params",
          title: "Invalid request query parameters",
          status: 400,
          detail: "Invalid Params",
        },
      },
    },
  },
}

export const commonResponses = {
  InvalidIdParamsResponse,
}