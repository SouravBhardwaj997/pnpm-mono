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
  const expenses = await prisma.expense.findMany({ where: { userId: req.user?.id }, take: Number(limit) + 1, ...(cursor && { cursor: { id: Number(cursor) }, skip: 1 }), orderBy: {
    id: "asc",
  } });
  const hasMore = expenses.length > Number(limit);
  const data = hasMore ? expenses.slice(0, expenses.length - 1) : expenses;
  const nextCursor = hasMore ? data.at(-1)?.id : null;
  return ApiResponse.success(res, 200, "Fetched Users Expenses", { expenses: data, nextCursor, hasMore });
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params as DeleteExpenseSchemaType["params"];
  await prisma.expense.delete({ where: { id: Number(id) } });
  return ApiResponse.noContent(res);
});

export const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params as UpdateExpenseSchemaType["params"];
  const { amount, categoryId, note, paymentMethod } = req.body as UpdateExpenseSchemaType["body"];

  const expense = await prisma.expense.update({ where: { id: Number(id) }, data: {
    amount,
    note,
    paymentMethod,
    categoryId,
  } });
  return ApiResponse.success(res, 200, "Expense Updated", expense);
});
