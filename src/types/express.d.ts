import {jwtPayload} from './auth.types.ts';

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload // for auth getMe
      validated?: {
        id?: number // validated route param :id
        page?: number
        pageSize?: number
        filter?: {
          isFeatured?: boolean
          tag?: string
        },
        booking?: {
          serviceId: number,
          artistId: number,
          date: string
        }
      }
    }
  }
}
export {};