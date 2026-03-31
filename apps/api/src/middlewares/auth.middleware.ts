import { verifyJWT } from "@/utils";
import { ApiError } from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";

export const requiredAuth = asyncHandler(async (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw ApiError.unAuthorized("No token provided");
  }
  const user = verifyJWT(token);

  req.user = user;
  next();
});
