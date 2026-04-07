import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import type { CreateUserInput, SafeUserResponse, LoginUserInput, AuthResponseData } from "./user.interface.js";
import { assignToken } from "../../utils/jwt.util.js";
import { AppError } from "../../common/errors/app-error.js";
import { toSafeUserResponse } from "./user.mapper.js";
import { ERROR_CODES } from "../../common/errors/error-code.js";

export const createUserService = async(input: CreateUserInput): Promise<AuthResponseData> => {
  const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });
  if (existingUser) {
    throw new AppError(ERROR_CODES.USER.EMAIL_CONFLICT);
  };

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(input.password, salt);
  const newUser = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: hashPassword,
    },
  });

  const userProfile = toSafeUserResponse(newUser);
  const token = assignToken(userProfile);
  const data:AuthResponseData =  {
    user: userProfile,
    token
  };
  return data;

}

export const loginUserService = async(input: LoginUserInput): Promise<AuthResponseData> => {

  // 1. check email exists or not
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  // email is not exist in db
  if (!existingUser) {
    throw new AppError(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
  }

  // 3rd party login 
  if (!existingUser.password) {
    throw new AppError(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
  }

  // 2. verify input.password == existingUser.password
  const isPwdMatch = bcrypt.compareSync(input.password, existingUser.password);
  if (!isPwdMatch || !existingUser.emailVerified) {
    throw new AppError(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
  }

  // 3. assign token
  const token = assignToken(existingUser);
  const userProfile = toSafeUserResponse(existingUser);

  const data:AuthResponseData =  {
    user: userProfile,
    token
  };
  return data;
};

export const getUserById = async(userId: number): Promise<SafeUserResponse> => {
  const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });
  if (!existingUser) {
    throw new AppError(ERROR_CODES.AUTH.INVALID_CREDENTIALS);
  }

  return toSafeUserResponse(existingUser);
}