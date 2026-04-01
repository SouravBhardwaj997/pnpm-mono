import { Router } from "express";
import { requiredAuth } from "@/middlewares/auth.middleware";
import authRouter from "./auth.route";
import expenseRouter from "./expense.route";
import incomeRouter from "./income.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/expense", requiredAuth, expenseRouter);
router.use("/income", requiredAuth, incomeRouter);

export default router;
