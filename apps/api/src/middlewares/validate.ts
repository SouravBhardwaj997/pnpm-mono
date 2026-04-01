import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import { ApiError } from "@/utils/apiError";

export function validate(schema: z.ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({ body: req.body, params: req.params, query: req.query });
    if (!result.success) {
      const errors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        if (!errors[key])
          errors[key] = [];
        errors[key].push(issue.message);
      }
      return ApiError.badRequest("Validation failed", errors);
    }
    req.body = result.data.body;
    next();
  };
}
