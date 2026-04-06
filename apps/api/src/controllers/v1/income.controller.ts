import type { AddIncomeSchemaType, DeleteIncomeSchemaType, GetIncomeSchemaType, UpdateIncomeSchemaType } from "@/schemas/income.schema";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

export const addIncome = asyncHandler(async (req, res) => {
  const { amount, incomeCategoryId, incomeMethod, note } = req.body as AddIncomeSchemaType["body"];
  const income = await prisma.income.create({ data: { amount, incomeMethod, note, incomeCategoryId, userId: req.user?.id || 0 } });
  return ApiResponse.created(res, "Income Added", income);
});

export const getIncome = asyncHandler(async (req, res) => {
  const { limit, cursor } = req.query as GetIncomeSchemaType["query"];

  const incomes = await prisma.income.findMany({ where: { userId: req.user?.id }, take: Number(limit) + 1, ...(cursor && { skip: 1, cursor: { id: Number(cursor) } }) });
  const hasMore = incomes.length > Number(limit);
  const data = hasMore ? incomes.slice(0, incomes.length - 1) : incomes;
  const nextCurosr = hasMore ? data.at(-1)?.id : null;

  return ApiResponse.success(res, 200, "Get Income Fetched Successfully", {
    incomes: data,
    nextCurosr,
    hasMore,
  });
});

export const updateIncome = asyncHandler(async (req, res) => {
  const { amount, incomeCategoryId, incomeMethod, note } = req.body as UpdateIncomeSchemaType["body"];
  const { id } = req.params as UpdateIncomeSchemaType["params"];

  const existingIncome = await prisma.income.findUnique({ where: { id: Number(id) } });
  if (!existingIncome) {
    return ApiError.badRequest("Income does not Exist", {});
  }
  const income = await prisma.income.update({ where: { id: Number(id) }, data: { amount, incomeCategoryId, incomeMethod, note } });
  return ApiResponse.success(res, 200, "Get Income Fetched Successfully", {
    incomes: income,
  });
});

export const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params as DeleteIncomeSchemaType["params"];

  const existingIncome = await prisma.income.findUnique({ where: { id: Number(id) } });
  if (!existingIncome) {
    return ApiError.badRequest("Income does not Exist", {});
  }
  const income = await prisma.income.delete({ where: { id: Number(id) } });
  return ApiResponse.success(res, 200, "Get Income Fetched Successfully", {
    incomes: income,
  });
});
