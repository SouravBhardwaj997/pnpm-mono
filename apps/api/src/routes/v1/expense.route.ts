import { Router } from "express";
import { addExpense, getExpenses } from "@/controllers/v1/expense.controller";
import { validate } from "@/middlewares/validate";
import { addExpenseSchema, deleteExpenseSchema } from "@/schemas/expense.schema";

const router = Router();

router.get("/", getExpenses);

router.post("/", validate(addExpenseSchema), addExpense);

router.delete("/:id", validate(deleteExpenseSchema));
export default router;
