import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "../../../api/src/trpc/appRouter";

type FieldErrors<T> = Partial<Record<keyof T, string>>

type parseTRPCErrorsReturnType<T> = {
  globalError: null | string,
  fieldErrors: FieldErrors<T> | null,
  type: "validation" | "conflict" | "server" | "network"
}

export function parseTRPCErrors<T>(err: TRPCClientErrorLike<AppRouter>): parseTRPCErrorsReturnType<T> {
  if (err.data?.zodError) {
    const fieldErrors: FieldErrors<T> = {}
    Object.entries(err.data.zodError.fieldErrors).map(([field, messages]) => {
      const msgs = messages as string[] | undefined;
      if (msgs?.[0]) {
        fieldErrors[field as keyof T] = msgs[0];
      }
    })
    return {
      fieldErrors,
      globalError: null,
      type: "validation"
    }
  }

  if (err.data?.code === "CONFLICT") {
    return {
      fieldErrors: {},
      globalError: err.message,
      type: "conflict"
    }
  }

  if (err.data?.code === "UNAUTHORIZED") {
    return {
      type: "server",
      globalError: "Your session has expired. Please log in again.",
      fieldErrors: {},
    };
  }

  return {
    type: "network",
    globalError: "Something went wrong. Please try again.",
    fieldErrors: {},
  };
}
