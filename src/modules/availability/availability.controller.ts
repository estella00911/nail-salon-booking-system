import type { Request, Response, NextFunction } from "express";
import { getAvailableSlotsService } from "./availability.service.js";
import type { ApiResponse } from "../../types/api.types.js";
import type { FreeSlotsResData } from "./availability.interface.js";

export const getAvailableSlotController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.validated?.id!;
    const { serviceId, artistId, date } = req.body;
    const availableSlots = await getAvailableSlotsService({ userId, artistId, serviceId, date });
    const response: ApiResponse<FreeSlotsResData> = {
      success: true,
      message: "Successfully fetched free time slots",
      data: availableSlots,
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}