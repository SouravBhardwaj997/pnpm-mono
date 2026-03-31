import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "@/lib/env";

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

export async function verifyJWT(token: string) {
  const decode = jwt.verify(token, env.JWT_SECRET);
  return decode;
}
