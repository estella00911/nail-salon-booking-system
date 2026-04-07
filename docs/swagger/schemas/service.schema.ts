import {serviceExamples} from '../examples/index.js';

const TagItem = {
  type: "object",
  required: ["id", "name", "type", "slug"],
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "手繪" },
    type: {
      type: "string",
      enum: ["TECHNIQUE", "STYLE"],
      example: "TECHNIQUE",
    },
    slug: { type: "string", example: "illustration" },
  },
};

const ServiceItem = {
  type: "object",
  required: ["id", "name", "imgUrl", "durationMin", "basePrice"],
  properties: {
    id: { type: "integer", example: 1 },
    name: { type: "string", example: "日系可愛插畫" },
    imgUrl: { type: "string", example: "https://www.exampleImg.com/fefw" },
    durationMin: { type: "integer", example: 60 },
    basePrice: { type: "integer", example: 900 },
  },
};

const ServiceWithTagItem = {
  type: "object",
  required: ["id", "name", "imgUrl", "durationMin", "basePrice", "tags"],
  properties: {
    ...ServiceItem.properties,
    tags: {
      type: "array",
      items: {
        $ref: "#/components/schemas/TagItem",
      },
      example: {...serviceExamples.tagItemListExample},
    },
  },
};

const ArtistItem = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: { type: "integer", example: 4 },
    name: { type: "string", example: "Mia" },
  },
};

const GetAllServicesResponse = {
  type: "object",
  required: ["success", "data", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully fetched services." },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/ServiceWithTagItem",
      }
    },
  },
};

const GetServiceByIdResponse = {
  type: "object",
  required: ["success", "data", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Successfully fetched services." },
    data: {
      $ref: "#/components/schemas/ServiceWithTagItem",
    },
  },
};


const CreateBookingResponse = {
  type: "object",
  required: ["success", "data", "message"],
  properties: {
    success: { type: "boolean", example: true },
    message: { type: "string", example: "Booking created successfully." },
    data: {
      $ref: "#/components/schemas/BookingItem",
    },
  }
}

export const serviceSchemas = {
  // entity
  ServiceWithTagItem,
  ServiceItem,
  TagItem,
  ArtistItem,
  // success response
  GetAllServicesResponse,
  GetServiceByIdResponse,
  CreateBookingResponse,
};