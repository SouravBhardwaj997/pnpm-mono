import type { NextFunction, Request, Response } from "express";
import { ApiError } from "@/utils/apiError";

export function errorHanlder(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }
  console.error("Internal Server Error", err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
}
