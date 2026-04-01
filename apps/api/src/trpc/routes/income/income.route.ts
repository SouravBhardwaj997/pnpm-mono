import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/prisma";
import { protectedProcedure, router } from "@/trpc/trpc";
import { addIncomeSchema, deleteUserIncomeSchema, getUserIncomesSchema, updateIncomeSchema } from "./schema";

export const incomeRouter = router({
  addIncome: protectedProcedure.input(addIncomeSchema).mutation(async ({ input, ctx }) => {
    const { amount, incomeCategoryId, incomeMethod, note } = input;
    const income = await prisma.income.create({ data: { amount, incomeMethod, note, incomeCategoryId, userId: ctx.user.id } });
    return {
      income,
    };
  }),
  getUserIncomes: protectedProcedure.input(getUserIncomesSchema).query(async ({ input, ctx }) => {
    const { limit, cursor } = input;

    const incomes = await prisma.income.findMany({ where: { userId: ctx.user.id }, take: Number(limit) + 1, ...(cursor && { skip: 1, cursor: { id: Number(cursor) } }) });
    const hasMore = incomes.length > limit;
    const data = hasMore ? incomes.slice(0, incomes.length - 1) : incomes;
    const nextCurosr = hasMore ? data.at(-1)?.id : null;

    return {
      income: data,
      nextCurosr,
      hasMore,
    };
  }),
  updateUserIncome: protectedProcedure.input(updateIncomeSchema).mutation(async ({ input, ctx }) => {
    const { amount, incomeMethod, incomeId, note, incomeCategoryId } = input;

    const expense = await prisma.income.updateMany({ where: { id: incomeId, userId: ctx.user.id }, data: {
      amount,
      note,
      incomeMethod,
      incomeCategoryId,
    } });
    if (expense.count === 0) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Expense not found or does not belong to you" });
    }
    return {
      expense,
    };
  }),
  deleteUserIncome: protectedProcedure.input(deleteUserIncomeSchema).mutation(async ({ input, ctx }) => {
    const { incomeId } = input;

    const expense = await prisma.income.deleteMany({
      where: {
        id: incomeId,
        userId: ctx.user.id,
      },
    });

    if (expense.count === 0) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Expense not found or does not belong to you" });
    }

    return { success: true };
  }),
});
