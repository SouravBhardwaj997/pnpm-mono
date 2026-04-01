import z from "zod";

export const getUserExpensesInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string(),
});

export const addUserExpenses = z.object({
  amount: z.int().min(1, "Amount is required"),
  note: z.string().min(1, "Note is required"),
  paymentMethod: z.enum(["CARD", "CASH"]).default("CARD"),
  categoryId: z.int().min(1, "Category ID is required"),
});
