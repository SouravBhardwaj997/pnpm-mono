import Router from "express";
import { addIncome } from "@/controllers/v1/income.controller";
import { validate } from "@/middlewares/validate";
import { addIncomeSchema } from "@/schemas/income.schema";

const router = Router();

router.get("/", validate(addIncomeSchema), addIncome);

export default router;
