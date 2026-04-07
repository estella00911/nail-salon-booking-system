export class AppError extends Error {
  type: string;
  title: string;
  status: number;
  detail: string;
  
  constructor(params: {
    type: string;
    title: string;
    status: number;
    detail: string;
  }) {
    super(params.detail);
    this.type = params.type;
    this.title = params.title;
    this.status = params.status;
    this.detail = params.detail;

    Error.captureStackTrace?.(this, this.constructor);
  }
}