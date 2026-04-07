import { env } from "../config.js";
import jwt, { type SignOptions } from 'jsonwebtoken';

import type { SafeUserResponse } from "../modules/user/user.interface.js";
import type { jwtPayload } from "../types/auth.types.js";

export const assignToken = (user: SafeUserResponse): string => {
  const payload = {
    userId: user.id,
    provider: user.provider,
    role: user.role
  } as jwtPayload;
  
  const jwtOptions: SignOptions = {
    expiresIn: env.jwt.expiresIn,
  };

  const token:string = jwt.sign(payload, env.jwt.secret, jwtOptions);
  
  return token;
};

export const verifyToken = (token: string): jwtPayload => {
    const decoded = jwt.verify(token, env.jwt.secret) as jwtPayload;
    return decoded;
}