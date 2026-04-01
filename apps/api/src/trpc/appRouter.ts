import { authRouter } from "./routes/auth/auth.routes";
import { expenseRouter } from "./routes/expense/expense.routes";
import { incomeRouter } from "./routes/income/income.route";
import { router } from "./trpc";

export const appRouter = router({
  expense: expenseRouter,
  auth: authRouter,
  income: incomeRouter,
});

export type AppRouter = typeof appRouter;
