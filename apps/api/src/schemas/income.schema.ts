import z from "zod";

export const addIncomeSchema = z.object({
  params: z.object({}),
  query: z.object({}),
  body: z.object({ amount: z.int().min(1, "Amount is Required"), note: z.string().optional(), incomeMethod: z.enum(["CASH", "CARD"]).default("CARD"), incomeCategoryId: z.int().min(1, "Income Category is required") }),
});

export const getIncomeSchema = z.object({
  params: z.object({}),
  query: z.object({
    cursor: z.string().optional(),
    limit: z.string(),
  }),
  body: z.undefined(),
});

export const updateIncomeSchema = z.object({
  params: z.object({
    id: z.string().min(1, "id is required to udpate income"),
  }),
  query: z.object({}),
  body: z.object({ amount: z.int().min(1, "Amount is Required"), note: z.string().optional(), incomeMethod: z.enum(["CASH", "CARD"]).default("CARD"), incomeCategoryId: z.int().min(1, "Income Category is required") }),
});

export const deleteIncomeSchema = z.strictObject({
  params: z.object({
    id: z.string().min(1, "Expense Id is required"),
  }),
  query: z.object({}),
  body: z.undefined(),
});

export type AddIncomeSchemaType = z.infer<typeof addIncomeSchema>;
export type GetIncomeSchemaType = z.infer<typeof getIncomeSchema>;
export type UpdateIncomeSchemaType = z.infer<typeof updateIncomeSchema>;
export type DeleteIncomeSchemaType = z.infer<typeof deleteIncomeSchema>;
