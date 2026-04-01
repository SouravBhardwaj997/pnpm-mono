import type { AddIncomeSchemaType } from "@/schemas/income.schema";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

export const addIncome = asyncHandler(async (req, res) => {
  const { amount, incomeCategoryId, incomeMethod, note } = req.body as AddIncomeSchemaType["body"];
  const income = await prisma.income.create({ data: { amount, incomeMethod, note, incomeCategoryId, userId: req.user?.id || 0 } });
  return ApiResponse.created(res, "Income Added", income);
});
