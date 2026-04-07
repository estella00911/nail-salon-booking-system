import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util.js";
import { AppError } from "../common/errors/app-error.js";
import { ERROR_CODES } from "../common/errors/error-code.js";

export const requireAuth = async(
  req: Request, 
  _res: Response, 
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "string" || 
    !authHeader.startsWith("Bearer ")
  ) {
    return next(new AppError(ERROR_CODES.AUTH.MISSING_TOKEN));
  }

  const [scheme, token] = authHeader.split(" "); // token = "Bearer xxxx";
  if (scheme !== "Bearer" || !token) {
      return next(new AppError(ERROR_CODES.AUTH.INVALID_TOKEN_FORMAT));
    }
  try {
    // 2. verify token
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    if (error instanceof Error) {
      // err case 1: expired token
      if (error.name === "TokenExpiredError") {
        return next(new AppError(ERROR_CODES.AUTH.TOKEN_EXPIRED));
      // err case 2: invalid token
      } else if (error.name === "JsonWebTokenError") {
        return next(new AppError(ERROR_CODES.AUTH.INVALID_TOKEN));
      }
    }
    return next(new AppError(ERROR_CODES.AUTH.UNKNOWN_TOKEN_ERROR));
  };
}