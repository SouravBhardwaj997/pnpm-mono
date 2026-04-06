import type { Response } from "express";

interface SuccessPayload<T> {
  success: true;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ApiResponse {
  static success<T>(res: Response, statusCode = 200, message = "Success", data?: T) {
    const payload: SuccessPayload<T> = { success: true, message, data };
    return res.status(statusCode).json(payload);
  }

  static created<T>(res: Response, message = "Created", data: T) {
    return ApiResponse.success(res, 201, message, data);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }

  static paginated<T>(res: Response, message = "Success", data: T[], meta: PaginationMeta) {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta,
    });
  }
}
