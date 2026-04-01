import { prisma } from "@/lib/prisma";
import { publicProcedure, router } from "@/trpc/trpc";
import { expenseListInputSchema } from "./schema";

export const expenseRouter = router({
  expenseList: publicProcedure
    .input(expenseListInputSchema)
    .query(async ({ input }) => {
      const { limit, cursor, userId } = input;
      const expenses = await prisma.expense.findMany({ where: { userId }, take: Number(limit) + 1, ...(cursor && { cursor: { id: Number(cursor) }, skip: 1 }), orderBy: {
        id: "asc",
      } });
      const hasMore = expenses.length > Number(limit);
      const data = hasMore ? expenses.slice(0, expenses.length - 1) : expenses;
      const nextCursor = hasMore ? data.at(-1)?.id : null;
      return { expenses: data, nextCursor, hasMore };
    }),
});
