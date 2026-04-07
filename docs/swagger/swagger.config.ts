import swaggerJSDoc from "swagger-jsdoc";
import { swaggerComponents } from "./index.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nail Salon API document",
      version: "1.0.0",
      description: "Nail Salon booking system API docs",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: swaggerComponents,
  },
  apis: ["./src/modules/**/*.route.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);