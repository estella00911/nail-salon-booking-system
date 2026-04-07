import type { Request, Response, NextFunction } from 'express';
import { ERROR_CODES } from '../../common/errors/error-code.js';
import { AppError } from '../../common/errors/app-error.js';

export const validateServiceFilterQuery = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const rawIsFeatured = req.query.isFeatured;
  const rawTag = req.query.tag;

  let isFeatured: boolean | undefined;
  let tag: string | undefined;

  if (typeof rawIsFeatured === 'string') {
    if (rawIsFeatured === 'true') {
      isFeatured = true;
    } else if (rawIsFeatured === 'false') {
      isFeatured = false;
    } else {
      return next(new AppError({
        ...ERROR_CODES.COMMON.INVALID_PARAMS,
        detail: `Invalid query parameter: isFeatured=${isFeatured}`,
      }));
    };
  }
  if (typeof rawTag === 'string') {
    const trimmedTag = rawTag.trim();
    if (trimmedTag.length === 0) {
      return next(new AppError({
        ...ERROR_CODES.COMMON.INVALID_PARAMS,
        detail: `Invalid query parameter: tag=${tag}`,
      }));
    }
    tag = trimmedTag;
  };
  req.validated = {
    ...req.validated,
    filter: {
      ...req.validated?.filter,
      ...(typeof isFeatured === "boolean" ? { isFeatured } : {}),
      ...(tag ? { tag } : {}),
    },
  }
  next();
}