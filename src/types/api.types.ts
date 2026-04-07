import type { Pagination } from "../modules/service/service.interface.js";

export interface ApiError {
  type: string,
  title: string,
  status: number,
  detail: string
}

export type ApiResponse<T> =
  | {
      success: true;
      message: string;
      data: T;
      pagination?: Pagination
    }
  | {
      success: false;
      error: ApiError;
    };


