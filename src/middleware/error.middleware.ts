import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../common/errors/app-error.js';
import type { ApiResponse } from '../types/api.types.js';
import { ERROR_CODES } from '../common/errors/error-code.js';
import { isDev } from '../config.js';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        type: err.type,
        title: err.title,
        status: err.status,
        detail: isDev()
      ? err.detail || err.message
      : err.title // : err.publicDetail || err.title
      }
    }
    
    return res.status(err.status).json(response);
  }

  console.error("Unhandled error: ", err);

  const response: ApiResponse<null> = {
    success: false,
    error: ERROR_CODES.INTERNAL.SERVER_ERROR,
  };

  return res.status(500).json(response);

}