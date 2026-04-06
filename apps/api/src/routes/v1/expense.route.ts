import { Router } from "express";
import { addExpense, deleteExpense, getExpenses, updateExpense } from "@/controllers/v1/expense.controller";
import { validate } from "@/middlewares/validate";
import { addExpenseSchema, deleteExpenseSchema, getExpensesSchema, updateExpenseSchema } from "@/schemas/expense.schema";

const router = Router();

router.get("/", validate(getExpensesSchema), getExpenses);

router.post("/", validate(addExpenseSchema), addExpense);

router.delete("/:id", validate(deleteExpenseSchema), deleteExpense);

router.patch("/:id", validate(updateExpenseSchema), updateExpense);

export default router;
