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
  static success<T>(res: Response, data: T, message = "Success", statusCode = 200) {
    const payload: SuccessPayload<T> = { success: true, message, data };
    return res.status(statusCode).json(payload);
  }

  static created<T>(res: Response, data: T, message = "Created") {
    return ApiResponse.success(res, data, message, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }

  static paginated<T>(res: Response, data: T[], meta: PaginationMeta, message = "Success") {
    return res.status(200).json({
      success: true,
      message,
      data,
      meta,
    });
  }
}
