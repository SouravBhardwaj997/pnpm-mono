import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/prisma";
import { protectedProcedure, router } from "@/trpc/trpc";
import { addUserExpensesSchema, deleteUserExpenseSchema, getUserExpensesInputSchema, updateUserExpensesSchema } from "./schema";

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
  addUserExpenses: protectedProcedure.input(addUserExpensesSchema).mutation(async ({ input, ctx }) => {
    const { amount, categoryId, note, paymentMethod } = input;
    const expense = await prisma.expense.create({ data: { amount, note, paymentMethod, categoryId, userId: ctx.user.id } });
    return {
      expense,
    };
  }),
  updateUserExpense: protectedProcedure.input(updateUserExpensesSchema).mutation(async ({ input, ctx }) => {
    const { amount, categoryId, expenseId, note, paymentMethod } = input;

    const expense = await prisma.expense.updateMany({ where: { id: expenseId, userId: ctx.user.id }, data: {
      amount,
      note,
      paymentMethod,
      categoryId,
    } });
    if (expense.count === 0) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Expense not found or does not belong to you" });
    }
    return {
      expense,
    };
  }),
  deleteUserExpense: protectedProcedure.input(deleteUserExpenseSchema).mutation(async ({ input, ctx }) => {
    const { expenseId } = input;

    const expense = await prisma.expense.deleteMany({
      where: {
        id: expenseId,
        userId: ctx.user.id,
      },
    });

    if (expense.count === 0) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Expense not found or does not belong to you" });
    }

    return { success: true };
  }),
});
