import Router from "express";
import { addIncome, deleteIncome, getIncome, updateIncome } from "@/controllers/v1/income.controller";
import { validate } from "@/middlewares/validate";
import { addIncomeSchema, deleteIncomeSchema, getIncomeSchema, updateIncomeSchema } from "@/schemas/income.schema";

const router = Router();

router.post("/", validate(addIncomeSchema), addIncome);

router.get("/", validate(getIncomeSchema), getIncome);

router.patch("/:id", validate(updateIncomeSchema), updateIncome);

router.delete("/:id", validate(deleteIncomeSchema), deleteIncome);

export default router;
