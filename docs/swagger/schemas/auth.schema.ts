const RegisterRequest = {
  type: "object",
  required: ["email", "password", "name"],
  properties: {
    email: { type: "string", example: "alice@example.com" },
    password: { type: "string", example: "12345678" },
    name: { type: "string", example: "Alice" },
  },
};

const LoginRequest = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", example: "bob@example.com" },
    password: { type: "string", example: "12345678" },
  },
};

const UserDetail = {
  type: "object",
  required: ["id", "name", "email", "role"],
  properties: {
    id: { type: "integer", example: 3 },
    email: { type: "string", example: "bob@prisma.io" },
    name: { type: "string", example: "Bob" },
    role: { type: "string", enum: ["USER", "ADMIN", "ARTIST"], example: "USER" },
  }
}



const AuthPayload = {
  type: "object",
  required: ["user", "token"],
  properties: {
    user: {
      $ref: "#/components/schemas/UserDetail",
    },
    token: {
      type: "string",
      example: "eyJhbGciOiJIUzI1212wewq.eyJ1c2VySwqwQQWQ12iOjEsInByb3ZpZGVyIjoiTE9DQUwiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3NTkyMDE2MiwiZXhwIjoxNzc2NTIqwdq-Kz5xG8PAfAReu9O8XTesrsdqqoHztZWzFMW4M4",
    },
  },
}

const RegisterSuccessBody = {
  allOf: [
    { $ref: "#/components/schemas/SuccessResponse" },
    {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          $ref: "#/components/schemas/AuthPayload",
        },
      },
    },
  ],
};

const LoginSuccessBody = {
  allOf: [
    { $ref: "#/components/schemas/SuccessResponse" },
    {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          $ref: "#/components/schemas/AuthPayload",
        },
      },
    },
  ],
};

const GetMeSuccessBody = {
  type: "object",
  required: ["success", "data", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully fetched services." },
    data: {
      $ref: "#/components/schemas/UserDetail",
    }
  },
};

export const authSchemas = {
  // entity
  UserDetail,
  AuthPayload,
  // request
  RegisterRequest,
  LoginRequest,
  // response
  GetMeSuccessBody,
  RegisterSuccessBody,
  LoginSuccessBody,
};