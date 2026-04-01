import { authRouter } from "./routes/auth/auth.routes";
import { expenseRouter } from "./routes/expense/expense.routes";
import { router } from "./trpc";

export const appRouter = router({
  expense: expenseRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
