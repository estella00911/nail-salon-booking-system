import dontenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';

dontenv.config();

type NodeEnv = "development" | "test" | "production";
const nodeEnv = process.env.NODE_ENV ?? "development";

const envFile = nodeEnv === "production" ? ".env.prod" : ".env";
dontenv.config({
  path: envFile,
});

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }
  return value;
}

function getNodeEnv(): NodeEnv {
  const nodeEnv = process.env.NODE_ENV;
  console.log('nodeEnv @ getNodeEnv = ', nodeEnv);
  if (!nodeEnv) {
    return "development";
  }
  if (nodeEnv !== 'development' && 
      nodeEnv !== 'production' && 
      nodeEnv !== 'test'
    ) {
    throw new Error(`Invalid NODE_ENV value: ${nodeEnv}. Expected 'development', 'production', or 'test'.`);
  }
  return nodeEnv;
};

export const isDev = () => getNodeEnv() === 'development';
export const isProd = () => getNodeEnv() === 'production';

export const env = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: requireEnv('JWT_SECRET'),
    expiresIn: requireEnv("JWT_EXPIRES_IN") as NonNullable<SignOptions["expiresIn"]>,
  },
  db: {
    url: requireEnv("DATABASE_URL"),
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  }
};