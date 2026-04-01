import { prisma } from "@/lib/prisma";
import { protectedProcedure, router } from "@/trpc/trpc";
import { addUserExpenses, getUserExpensesInputSchema } from "./schema";

export const expenseRouter = router({
  getUserExpenses: protectedProcedure
    .input(getUserExpensesInputSchema)
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const expenses = await prisma.expense.findMany({ where: { userId: ctx.user.id }, take: Number(limit) + 1, ...(cursor && { cursor: { id: Number(cursor) }, skip: 1 }), orderBy: {
        id: "asc",
      } });
      const hasMore = expenses.length > Number(limit);
      const data = hasMore ? expenses.slice(0, expenses.length - 1) : expenses;
      const nextCursor = hasMore ? data.at(-1)?.id : null;
      return { expenses: data, nextCursor, hasMore };
    }),
  addUserExpenses: protectedProcedure.input(addUserExpenses).query(async ({ input, ctx }) => {
    const { amount, categoryId, note, paymentMethod } = input;
    const expense = await prisma.expense.create({ data: { amount, note, paymentMethod, categoryId, userId: ctx.user.id } });
    return {
      expense,
    };
  }),
});
