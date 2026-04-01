import z from "zod";

export const addIncomeSchema = z.object({
  params: z.object({}),
  query: z.object({}),
  body: z.object({ amount: z.int().min(1, "Amount is Required"), note: z.string().optional(), incomeMethod: z.enum(["CASH", "CARD"]).default("CARD"), incomeCategoryId: z.int().min(1, "Income Category is required") }),
});

export type AddIncomeSchemaType = z.infer<typeof addIncomeSchema>;
