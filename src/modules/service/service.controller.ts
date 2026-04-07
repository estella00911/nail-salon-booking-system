import type { ApiResponse } from "../../types/api.types.js";
import type { Service, ServiceFilter } from "./service.interface.js";
import { getAllServices, getPaginatedServices, getServiceById } from "./service.service.js";
import type { Request, Response, NextFunction } from 'express';


export const getAllServicesController = async(
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.validated?.page;
    const pageSize = req.validated?.pageSize;
    const filter = req.validated?.filter;
    const tag = filter?.tag;
    const isFeatured = filter?.isFeatured;
    const serviceFilter: ServiceFilter = { tag, isFeatured };
    
    let response;

    if (page !== undefined && pageSize !== undefined) {
      const result = await getPaginatedServices(page, pageSize, serviceFilter);
      response = {
        success: true,
        message: "successfully fetched services",
        pagination: result.pagination,
        data: result.data,
      };
    } else {
      const result = await getAllServices(serviceFilter);
      response = {
        success: true,
        message: "successfully fetched services",
        data: result,
      }
    }
  return res.status(200).json(response);
  } catch(err) {
    return next(err);
  }
}
export const getServiceByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
)=> {
  try {
    const id = Number(req.validated!.id);
    const data = await getServiceById(id);

    const response: ApiResponse<Service> = {
      success: true,
      message: "Successfully fetched service",
      data: data,
    };

    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
