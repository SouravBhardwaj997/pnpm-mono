import type { loginSchemaType, signUpSchemaType } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/utils";
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
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      username: username.toLowerCase(),
    },
    omit: { password: true },
  });

  return ApiResponse.created(res, "User Created Successfully", user);
});

export const login = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body as loginSchemaType["body"];

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: usernameOrEmail.toLowerCase() }, { username: usernameOrEmail.toLowerCase() }],
    },
  });

  if (!existingUser) {
    return ApiError.badRequest("Invalid Credentials", {});
  }

  const isPasswordMatched = await comparePassword(password, existingUser.password);
  if (!isPasswordMatched) {
    return ApiError.badRequest("Invalid Credentials", {});
  }

  return ApiResponse.success(res, 200, "User Logged In", { ...existingUser, password: null });
});
