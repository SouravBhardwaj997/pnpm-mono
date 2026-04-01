import { expenseRouter } from "./routes/expense/expense.route";
import { router } from "./trpc";

export const appRouter = router({
  expense: expenseRouter,
});

export type AppRouter = typeof appRouter;
