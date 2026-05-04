import type { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/app-error.js";
import { ERROR_CODES } from "../common/errors/error-code.js";
import { ZodError, type ZodTypeAny } from "zod";
const validateIdParams = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS,
      detail: "Invalid route parameter 'id'. It must be a positive number.",
    }));
  }
  req.validated = {
    ...req.validated,
    id,
  };
  return next();
}

const validatePaginationQuery = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const page = typeof req.query.page === "string"
    ? Number(req.query.page)
    : undefined;

  const pageSize = typeof req.query.pageSize === "string"
    ? Number(req.query.pageSize)
    : undefined;

  // invalid pagination query
  if (
    (page !== undefined && pageSize === undefined) ||
    (page === undefined && pageSize !== undefined)
  ) {
    return next(new AppError({
      ...ERROR_CODES.COMMON.INVALID_PARAMS,
      detail: "Invalid pagination query. 'page' and 'pageSize' must be provided together."
    }));
  }
  // valid pagination query
  if (page !== undefined && pageSize !== undefined) {
    if (
      Number.isNaN(page) || Number.isNaN(pageSize) ||
      page <= 0 ||
      pageSize <= 0 || pageSize > 50
    ) {
      return next(new AppError({
        ...ERROR_CODES.COMMON.INVALID_PARAMS,
        detail: "Invalid pagination query. 'page' must be > 0 and 'pageSize' must be between 1 and 50."
      }));
    }

    req.validated = {
      ...req.validated,
      page,
      pageSize,
    };
  }

  return next();
};


const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // zod check data is valid and parse it
      const parseData = await schema.parseAsync({
        params: req.params,
        query: req.query,
        body: req.body,
      }) as {
        body?: Request["body"];
        query?: Request["query"];
        params?: Request["params"];
      };

      // overwrite backc validated, clean, safe data back to req
      if (parseData.body) req.body = parseData.body;
      if (parseData.query) req.query = parseData.query;
      if (parseData.params) req.params = parseData.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // zod error to invalid parameters error and return it
        return next(new AppError({
          ...ERROR_CODES.COMMON.INVALID_PARAMS,
          detail: error.issues.map(issue => issue.message).join(', ')
          // print all error message frinedly for frontend dev

        }));
      }
      return next(error);
    }
  }
}
export {
  validateIdParams,
  validatePaginationQuery,
  validate,
};