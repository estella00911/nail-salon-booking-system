import type { User } from "../../generated/prisma/client.js";
import type { SafeUserResponse } from "./user.interface.js";

export const toSafeUserResponse = (user: User): SafeUserResponse => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};