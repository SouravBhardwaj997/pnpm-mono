import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getUserFromToken } from "@/utils";

export async function createContext({
  req,
  res,
}: CreateExpressContextOptions) {
  const token = req.headers.authorization?.split(" ")[1];
  const user = token ? getUserFromToken(token) : null;
  return { req, res, user };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
