export interface SafeUserResponse {
  id: number;
  name: string;
  email: string;
  provider?: string;
  role: string;
}

interface BaseAuthInput {
  email: string;
  password: string;
}

export interface LoginUserInput extends BaseAuthInput {}

export interface CreateUserInput extends BaseAuthInput {
  name: string;
}

export interface AuthResponseData {
  user: SafeUserResponse;
  token: string;
}