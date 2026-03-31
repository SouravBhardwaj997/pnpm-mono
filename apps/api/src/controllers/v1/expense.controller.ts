import type { AddExpenseSchemaType, DeleteExpenseSchemaType, GetExpensesSchemaType, UpdateExpenseSchemaType } from "@/schemas/expense.schema";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

export const addExpense = asyncHandler(async (req, res) => {
  const { amount, categoryId, note, paymentMethod } = req.body as AddExpenseSchemaType["body"];
  const expense = await prisma.expense.create({ data: { amount, note, paymentMethod, categoryId, userId: req.user?.id ?? 0 } });
  return ApiResponse.created(res, "Expense Added", expense);
});

export const getExpenses = asyncHandler(async (req, res) => {
  const { limit = 10, cursor } = req.query as GetExpensesSchemaType["query"];
  const expenses = await prisma.expense.findMany({ where: { userId: req.user?.id }, take: Number(limit), ...(cursor && { cursor: { id: Number(cursor) }, skip: 1 }), orderBy: {
    id: "asc",
  } });
  return ApiResponse.success(res, 200, "Fetched Users Expenses", { expenses, nextCursor: expenses.at(-1)?.id, hasMore: expenses.length });
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params as DeleteExpenseSchemaType["params"];
  await prisma.expense.delete({ where: { id: Number(expenseId) } });
  return ApiResponse.noContent(res);
});

export const updateExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params as UpdateExpenseSchemaType["params"];
  const { amount, categoryId, note, paymentMethod } = req.body as UpdateExpenseSchemaType["body"];

  const expense = await prisma.expense.update({ where: { id: Number(expenseId) }, data: {
    amount,
    note,
    paymentMethod,
    categoryId,
  } });
  return ApiResponse.success(res, 200, "Expense Updated", expense);
});
