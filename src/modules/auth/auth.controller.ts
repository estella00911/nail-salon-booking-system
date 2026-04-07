import type { NextFunction, Request, Response } from 'express';
import { createUserService, getUserById, loginUserService } from '../user/user.service.js';
import type { AuthResponseData, SafeUserResponse } from '../user/user.interface.js';
import type { ApiResponse } from '../../types/api.types.js';

export const createUserController = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const {name, email, password} = req.body;
    const user = await createUserService({
      email,
      name,
      password
    })
    const response: ApiResponse<AuthResponseData> = {
      success: true,
      message: "Successfully registered.",
      data: user
    };
    return res.status(201).json(response);

  } catch(error) {
      return next(error);
  }
}

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, password} = req.body;
    const user = await loginUserService({email, password});
    const response: ApiResponse<AuthResponseData> = {
      success: true,
      message: "Successfully logged in.",
      data: user
    };

    return res.status(200).json(response);
  } catch(error) {
      return next(error);
  }
}

export const getCurrentUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const existingUser = await getUserById(userId);
    const response:ApiResponse<SafeUserResponse> = {
      success: true,
      message: "Successfully get current user profile.",
      data: existingUser
    };
    return res.status(200).json(response);
  } catch(error) {
    return next(error);
  }
}