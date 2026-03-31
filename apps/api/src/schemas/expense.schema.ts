import { z } from "zod";

export const getExpensesSchema = z.object({
  params: z.object({}),
  query: z.object({
    cursor: z.string(),
    limit: z.string(),
  }),
  body: z.object({}),
});

export const addExpenseSchema = z.strictObject({
  params: z.object({}),
  query: z.object({}),
  body: z.strictObject({
    amount: z.int().min(1, "Amount is required"),
    note: z.string().min(1, "Note is required"),
    paymentMethod: z.enum(["CARD", "CASH"]).default("CARD"),
    categoryId: z.int().min(1, "Note is required"),
  }),
});

export const deleteExpenseSchema = z.strictObject({
  params: z.object({
    expenseId: z.string().min(1, "Expense Id is required"),
  }),
  query: z.object({}),
  body: z.object({}),
});

export const updateExpenseSchema = z.strictObject({
  params: z.object({
    expenseId: z.string().min(1, "Expense Id is required"),
  }),
  query: z.object({}),
  body: z.object({ amount: z.int().min(1, "Amount is required"), note: z.string().min(1, "Note is required"), paymentMethod: z.enum(["CARD", "CASH"]).default("CARD"), categoryId: z.int().min(1, "Category Id is required") }),
});

export type AddExpenseSchemaType = z.infer<typeof addExpenseSchema>;
export type DeleteExpenseSchemaType = z.infer<typeof deleteExpenseSchema>;
export type UpdateExpenseSchemaType = z.infer<typeof updateExpenseSchema>;
export type GetExpensesSchemaType = z.infer<typeof getExpensesSchema>;
