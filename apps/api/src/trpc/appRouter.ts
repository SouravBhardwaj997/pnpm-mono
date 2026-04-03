import z from "zod";
import { authRouter } from "./routes/auth/auth.routes";
import { expenseRouter } from "./routes/expense/expense.routes";
import { incomeRouter } from "./routes/income/income.route";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  expense: expenseRouter,
  auth: authRouter,
  income: incomeRouter,
  tempRoute: publicProcedure.input(z.undefined()).query(() => {
    return [
      {
        id: 1,
        name: "Sourav",
        age: 20,
      },
      {
        id: 2,
        name: "John",
        age: 20,
      },
      {
        id: 3,
        name: "Jane",
        age: 20,
      },
      {
        id: 4,
        name: "Seth",
        age: 20,
      },
    ];
  }),
});

export type AppRouter = typeof appRouter;
