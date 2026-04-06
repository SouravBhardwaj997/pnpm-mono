export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;
  public readonly isOperational: boolean;
  constructor(statusCode: number, message: string, errors?: Record<string, string[]>, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  };

  static badRequest(message = "Bad Request", errors: Record<string, string[]>) {
    throw new ApiError(400, message, errors);
  }

  static unAuthorized(message = "UnAuthorized") {
    throw new ApiError(401, message);
  };

  static forbidden(message = "Forbidden") {
    throw new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static internal(message = "Something Went Wrong") {
    return new ApiError(500, message, undefined, true);
  }
}
