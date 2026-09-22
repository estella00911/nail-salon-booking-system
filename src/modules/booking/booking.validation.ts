import { z } from "zod";
import { isStartBeforeEnd } from "../../utils/datetime.utils.js";

const createBookingSchema = z.object({
  body: z.object({
    serviceId: z.number().int().positive("serviceId must be a positive integer"),
    artistId: z.number().int().positive("artistId must be a positive integer"),
    startTime: z.coerce.date().min(new Date(), "startTime must be a valid future date"),
    endTime: z.coerce.date().min(new Date(), "endTime must be a valid future date"),
    memo: z.string().trim().max(500, "memo must be at most 500 characters").optional(),
  })
}).refine((data) =>
  isStartBeforeEnd(data.body.startTime, data.body.endTime), {
  message: "start time must be earlier than end time",
  path: ["body", "endTime"], // this field will make zod return error with this field, endTime.
})

type CreateBookingRequest = z.infer<typeof createBookingSchema>['body'];


const idParamSchema = z.object({
  id: z.string().regex(/^[1-9][0-9]*$/, "id must be a positive integer"),
});
type IdParams = z.infer<typeof idParamSchema>;
export {
  type CreateBookingRequest,
  createBookingSchema,
  type IdParams,
  idParamSchema,
}