import type { Request } from "express";
import type * as core from "express-serve-static-core";
import type qs from "qs";
import type { Pagination } from "../modules/service/service.interface.js";
import type { jwtPayload } from "./auth.types.js";

interface ApiError {
  type: string,
  title: string,
  status: number,
  detail: string
}

type ApiResponse<T> =
  | {
    success: true;
    message: string;
    data: T;
    pagination?: Pagination
  }
  | {
    success: false;
    error: ApiError;
  };

// AuthRequest: Express.Request with custom user field. Generics <P, ResBody, ReqBody, ReqQuery>
interface AuthRequest<
  P = core.ParamsDictionary, // params w/ default type (= core.ParamsDictionary. this is Express official default type)
  ResBody = any, // res.json() body
  ReqBody = any, // req.body
  ReqQuery = qs.ParsedQs // req.query

> extends Request<P, ResBody, ReqBody, ReqQuery> { // extends Request (Inheritance) 
  // user just only add on this Request to override
  user: jwtPayload; // Type Narrowing
}

export {
  type ApiResponse,
  type ApiError,
  type AuthRequest
};