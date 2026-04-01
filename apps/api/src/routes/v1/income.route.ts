import Router from "express";
import { addIncome, getIncome } from "@/controllers/v1/income.controller";
import { validate } from "@/middlewares/validate";
import { addIncomeSchema, getIncomeSchema } from "@/schemas/income.schema";

const router = Router();

router.post("/", validate(addIncomeSchema), addIncome);

router.get("/", validate(getIncomeSchema), getIncome);

export default router;
