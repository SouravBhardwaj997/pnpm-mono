import z from "zod";

export const addIncomeSchema = z.object({
  amount: z.int().min(1, "Amount is Required"),
  note: z.string().optional(),
  incomeMethod: z.enum(["CASH", "CARD"]).default("CARD"),
  incomeCategoryId: z.int().min(1, "Income Category is required"),
});

export const getUserIncomesSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number(),
});

export const updateIncomeSchema = z.object({
  incomeId: z.int().min(1, "Income Id is required"),
  amount: z.int().min(1, "Amount is Required"),
  note: z.string().optional(),
  incomeMethod: z.enum(["CASH", "CARD"]).default("CARD"),
  incomeCategoryId: z.int().min(1, "Income Category is required"),
});

export const deleteUserIncomeSchema = z.object({
  incomeId: z.int().min(1, "Income Id is required"),
});
