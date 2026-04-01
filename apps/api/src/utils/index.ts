import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "@/lib/env";
import { ApiError } from "./apiError";

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(originalPassword: string, hashedPassword: string) {
  const isSuccess = await bcrypt.compare(originalPassword, hashedPassword);
  return isSuccess;
}

export async function signJWT(user: { email: string; name: string; username: string }) {
  const token = jwt.sign(user, env.JWT_SECRET);
  return token;
}

export interface User {
  id: number;
  email: string;
  username: string;
  name: string;
  createdAt: string;
  iat: number;
}

export function verifyJWT(token: string) {
  try {
    const decode = jwt.verify(token, env.JWT_SECRET) as User;
    return decode;
  }
  catch {
    throw ApiError.unAuthorized("Invalid or Expired Token");
  }
}

export function getUserFromToken(token: string) {
  try {
    const decode = jwt.verify(token, env.JWT_SECRET) as User;
    return decode;
  }
  catch {
    return null;
  }
}
