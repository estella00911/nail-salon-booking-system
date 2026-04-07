import type { Request, Response, NextFunction } from "express";
import { ERROR_CODES } from "../../common/errors/error-code.js";
import { AppError } from "../../common/errors/app-error.js";

const emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (
  req: Request, 
  _res: Response, 
  next: NextFunction
) => {
  const { email, name, password } = req.body;

  // check required input field
  if (!name || !email || !password) {
    return next(new AppError(ERROR_CODES.VALIDATION.REQUIRED_REGISTER_FIELDS));
  }

  // validate email format
  if (typeof email !== "string" || 
    email.trim() === "" ||
    emailRegex.test(email) === false
  ) {
      return next(new AppError(ERROR_CODES.VALIDATION.INVALID_EMAIL));
  }

  // validate password and its length
  if (typeof password !== "string" || 
    password.trim() === "" || 
    password.length < 8
  ) {
    return next(new AppError(ERROR_CODES.VALIDATION.INVALID_PASSWORD));
  }

  // validate name
  if (typeof name !== "string" ||
    name.trim() === "" ||
    name.length < 2
  ) {
    return next(new AppError(ERROR_CODES.VALIDATION.INVALID_NAME));
  }
  next();
}

export const validateLogin = (
  req: Request, 
  _res: Response, 
  next: NextFunction
) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return next(new AppError(ERROR_CODES.VALIDATION.REQUIRED_LOGIN_FIELDS));
  }

  if (typeof email !== "string" ||
    email.trim() === "" ||
    emailRegex.test(email) === false
  ) {
    return next(new AppError(ERROR_CODES.VALIDATION.INVALID_EMAIL));
  }

  if (typeof password !== "string" ||
    password.trim() === "" ||
    password.length < 8
  ) {
    return next(new AppError(ERROR_CODES.VALIDATION.INVALID_PASSWORD));
  }
  next();
}