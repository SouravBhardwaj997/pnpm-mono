import type { Context } from "./context";
import { initTRPC, TRPCError } from "@trpc/server";
import z, { ZodError } from "zod";

const t = initTRPC.context<Context>().create({
  errorFormatter: ({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? z.flattenError(error.cause)
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

const isAuthed = middleware(({ ctx, next }) => {
  if (!ctx.user)
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthenticated" });
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const protectedProcedure = publicProcedure.use(isAuthed);
