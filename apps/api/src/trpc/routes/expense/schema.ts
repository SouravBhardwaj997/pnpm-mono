import z from "zod";

export const expenseListInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string(),
});
