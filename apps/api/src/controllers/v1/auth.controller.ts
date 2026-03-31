import type { signUpSchemaType } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

export const signUp = asyncHandler(async (req, res) => {
  const { email, password, username, name } = req.body as signUpSchemaType["body"];
  const existingEmail = await prisma.user.findFirst({ where: { email } });
  if (existingEmail) {
    return ApiError.badRequest("User Already Exists", {});
  }
  const existingUsername = await prisma.user.findFirst({ where: { username } });
  if (existingUsername) {
    return ApiError.badRequest("Username Already Exist", {});
  }
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      username,
    },
    omit: { password: true },
  });

  return ApiResponse.created(res, "User Created Successfully", user);
});
