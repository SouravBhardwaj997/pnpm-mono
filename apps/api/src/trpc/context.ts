import type * as trpcExpress from "@trpc/server/adapters/express";

export function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  return {};
} // no context
export type Context = Awaited<ReturnType<typeof createContext>>;
