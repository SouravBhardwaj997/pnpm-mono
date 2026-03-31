import { Router } from "express";
import { requiredAuth } from "@/middlewares/auth.middleware";
import authRouter from "./auth.route";
import expenseRouter from "./expense.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/expense", requiredAuth, expenseRouter);

export default router;
