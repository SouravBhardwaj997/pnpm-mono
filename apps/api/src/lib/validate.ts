import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ApiResponse } from "@/utils/apiResponse";

export function validate(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = z.safeParse(schema, req);
      ApiResponse(200, "Hello");
    }
    catch (error) {
      console.log("error", error);
    }
  };
}
